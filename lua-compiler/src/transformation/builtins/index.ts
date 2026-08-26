import * as ts from "typescript"
import { LuaTarget } from "../../CompilerOptions"
import * as luaCore from "../../LuaAST-core"
import * as luaExpressions from "../../LuaAST-expressions"
import type { TransformationContext } from "../context/transformation-context"
import { unsupportedBuiltinOptionalCall, unsupportedProperty } from "../utils/diagnostics"
import { createNaN } from "../utils/lua-ast"
import {
  createStaticPromiseFunctionAccessor,
  importLuaLibFeature,
  transformLuaLibFunction,
} from "../utils/lualib"
import { LuaLibFeature } from "../../LuaLib"
import { getIdentifierSymbolId } from "../utils/symbols"
import { maybeWrapThisVoidAsAdapter } from "../utils/this-void-adapter"
import {
  getCalledExpression,
  isArrayType,
  isFunctionType,
  isStandardLibraryType,
  isStringType,
} from "../utils/typescript/typescript"
import {
  transformArrayConstructorCall,
  transformArrayProperty,
  transformArrayPrototypeCall,
} from "./array"
import { transformConsoleCall } from "./console"
import { transformFunctionProperty, transformFunctionPrototypeCall } from "./function"
import { tryTransformBuiltinGlobalCall } from "./global"
import { transformMapConstructorCall } from "./map"
import { transformMathCall, transformMathProperty } from "./math"
import {
  transformNumberConstructorCall,
  transformNumberProperty,
  transformNumberPrototypeCall,
} from "./number"
import { transformObjectConstructorCall, tryTransformObjectPrototypeCall } from "./object"
import {
  transformStringConstructorMethodCall,
  transformStringProperty,
  transformStringPrototypeCall,
} from "./string"
import { transformSymbolConstructorCall } from "./symbol"

export function transformBuiltinPropertyAccessExpression(
  context: TransformationContext,
  node: ts.PropertyAccessExpression
): luaExpressions.Expression | undefined {
  const ownerType = context.checker.getTypeAtLocation(node.expression)

  if (ts.isIdentifier(node.expression) && isStandardLibraryType(context, ownerType, undefined)) {
    switch (ownerType.symbol.name) {
      case "NumberConstructor":
        return transformNumberProperty(context, node)
      case "Math":
        return transformMathProperty(context, node)
      case "SymbolConstructor":
        importLuaLibFeature(context, LuaLibFeature.Symbol)
    }
  }

  if (isStringType(context, ownerType)) {
    return transformStringProperty(context, node)
  }

  if (isArrayType(context, ownerType)) {
    return transformArrayProperty(context, node)
  }

  if (isFunctionType(ownerType)) {
    return transformFunctionProperty(context, node)
  }
}

export function transformBuiltinCallExpression(
  context: TransformationContext,
  node: ts.CallExpression
): luaExpressions.Expression | undefined {
  const expressionType = context.checker.getTypeAtLocation(node.expression)
  if (
    ts.isIdentifier(node.expression) &&
    isStandardLibraryType(context, expressionType, undefined)
  ) {
    checkForLuaLibType(context, expressionType)
    const result = tryTransformBuiltinGlobalCall(context, node, expressionType)
    if (result) return result
  }

  const calledMethod = ts.getOriginalNode(getCalledExpression(node))
  if (ts.isPropertyAccessExpression(calledMethod)) {
    const globalResult = tryTransformBuiltinGlobalMethodCall(context, node, calledMethod)
    if (globalResult) return globalResult

    const prototypeResult = tryTransformBuiltinPropertyCall(context, node, calledMethod)
    if (prototypeResult) return prototypeResult

    const objectResult = tryTransformObjectPrototypeCall(context, node, calledMethod)
    if (objectResult) return objectResult
  }
}

function tryTransformBuiltinGlobalMethodCall(
  context: TransformationContext,
  node: ts.CallExpression,
  calledMethod: ts.PropertyAccessExpression
) {
  const ownerType = context.checker.getTypeAtLocation(calledMethod.expression)
  const ownerSymbol = tryGetStandardLibrarySymbolOfType(context, ownerType)
  if (!ownerSymbol || ownerSymbol.parent) return

  let result: luaExpressions.Expression | undefined
  switch (ownerSymbol.name) {
    case "ArrayConstructor":
      result = transformArrayConstructorCall(context, node, calledMethod)
      break
    case "Console":
      result = transformConsoleCall(context, node, calledMethod)
      break
    case "MapConstructor":
      result = transformMapConstructorCall(context, node, calledMethod)
      break
    case "Math":
      result = transformMathCall(context, node, calledMethod)
      break
    case "StringConstructor":
      result = transformStringConstructorMethodCall(context, node, calledMethod)
      break
    case "ObjectConstructor":
      result = transformObjectConstructorCall(context, node, calledMethod)
      break
    case "SymbolConstructor":
      result = transformSymbolConstructorCall(context, node, calledMethod)
      break
    case "NumberConstructor":
      result = transformNumberConstructorCall(context, node, calledMethod)
      break
    case "PromiseConstructor":
      result = transformPromiseConstructorCall(context, node, calledMethod)
      break
  }
  if (result && calledMethod.questionDotToken) {
    context.addDiagnostic(unsupportedBuiltinOptionalCall(calledMethod))
  }
  return result
}

function tryTransformBuiltinPropertyCall(
  context: TransformationContext,
  node: ts.CallExpression,
  calledMethod: ts.PropertyAccessExpression
) {
  const functionType = context.checker.getTypeAtLocation(node.expression)
  const callSymbol = tryGetStandardLibrarySymbolOfType(context, functionType)
  if (!callSymbol) return
  const ownerSymbol = callSymbol.parent
  if (!ownerSymbol || ownerSymbol.parent) return

  switch (ownerSymbol.name) {
    case "String":
      return transformStringPrototypeCall(context, node, calledMethod)
    case "Number":
      return transformNumberPrototypeCall(context, node, calledMethod)
    case "Array":
    case "ReadonlyArray":
      return transformArrayPrototypeCall(context, node, calledMethod)
    case "Function":
    case "CallableFunction":
    case "NewableFunction":
      return transformFunctionPrototypeCall(context, node, calledMethod)
  }
}

export function transformBuiltinIdentifierExpression(
  context: TransformationContext,
  node: ts.Identifier,
  symbol: ts.Symbol | undefined
): luaExpressions.Expression | undefined {
  switch (node.text) {
    case "NaN":
      return createNaN(node)

    case "Infinity":
      if (context.luaTarget === LuaTarget.Lua50) {
        const one = luaExpressions.createNumericLiteral(1)
        const zero = luaExpressions.createNumericLiteral(0)
        return luaExpressions.createBinaryExpression(one, zero, luaCore.SyntaxKind.DivisionOperator)
      } else {
        const math = luaExpressions.createIdentifier("math")
        const huge = luaExpressions.createStringLiteral("huge")
        return luaExpressions.createTableIndexExpression(math, huge, node)
      }
    case "globalThis":
      return luaExpressions.createIdentifier(
        "_G",
        node,
        getIdentifierSymbolId(context, node, symbol),
        "globalThis"
      )

    case "Number":
    case "String":
    case "parseInt":
    case "parseFloat":
    case "structuredClone": {
      const type = context.checker.getTypeAtLocation(node)
      if (!isStandardLibraryType(context, type, undefined)) return undefined
      const symbolId = getIdentifierSymbolId(context, node, symbol)
      let polyfill: luaExpressions.Expression
      switch (node.text) {
        case "Number":
          importLuaLibFeature(context, LuaLibFeature.Number)
          polyfill = luaExpressions.createIdentifier("__TS__Number", node, symbolId, "Number")
          break
        case "String":
          polyfill = luaExpressions.createIdentifier("tostring", node, symbolId, "String")
          break
        case "parseInt":
          importLuaLibFeature(context, LuaLibFeature.ParseInt)
          polyfill = luaExpressions.createIdentifier("__TS__ParseInt", node, symbolId, "parseInt")
          break
        case "parseFloat":
          importLuaLibFeature(context, LuaLibFeature.ParseFloat)
          polyfill = luaExpressions.createIdentifier("__TS__ParseFloat", node, symbolId, "parseFloat")
          break
        case "structuredClone":
          importLuaLibFeature(context, LuaLibFeature.StructuredClone)
          polyfill = luaExpressions.createIdentifier(
            "__TS__StructuredClone",
            node,
            symbolId,
            "structuredClone"
          )
          break
      }
      return maybeWrapThisVoidAsAdapter(context, node, polyfill, "forced")
    }
  }
}

const builtinErrorTypeNames = new Set([
  "Error",
  "ErrorConstructor",
  "RangeError",
  "RangeErrorConstructor",
  "ReferenceError",
  "ReferenceErrorConstructor",
  "SyntaxError",
  "SyntaxErrorConstructor",
  "TypeError",
  "TypeErrorConstructor",
  "URIError",
  "URIErrorConstructor",
])

export function checkForLuaLibType(context: TransformationContext, type: ts.Type): undefined {
  const symbol = type.symbol
  if (!symbol || symbol.parent) return
  const name = symbol.name

  switch (name) {
    case "Map":
    case "MapConstructor":
      importLuaLibFeature(context, LuaLibFeature.Map)
      return
    case "Set":
    case "SetConstructor":
      importLuaLibFeature(context, LuaLibFeature.Set)
      return
    case "WeakMap":
    case "WeakMapConstructor":
      importLuaLibFeature(context, LuaLibFeature.WeakMap)
      return
    case "WeakSet":
    case "WeakSetConstructor":
      importLuaLibFeature(context, LuaLibFeature.WeakSet)
      return
    case "Promise":
    case "PromiseConstructor":
      importLuaLibFeature(context, LuaLibFeature.Promise)
      return
    case "JSON":
      importLuaLibFeature(context, LuaLibFeature.JSON)
      return
    case "Performance":
      importLuaLibFeature(context, LuaLibFeature.Performance)
      return
  }

  if (builtinErrorTypeNames.has(name)) {
    importLuaLibFeature(context, LuaLibFeature.Error)
  }
}

export function tryGetStandardLibrarySymbolOfType(
  context: TransformationContext,
  type: ts.Type
): ts.Symbol | undefined {
  if (type.isUnionOrIntersection()) {
    for (const subType of type.types) {
      const symbol = tryGetStandardLibrarySymbolOfType(context, subType)
      if (symbol) return symbol
    }
  } else if (isStandardLibraryType(context, type, undefined)) {
    return type.symbol
  }

  return undefined
}

export function isPromiseClass(context: TransformationContext, node: ts.Identifier) {
  if (node.text !== "Promise") return false
  const type = context.checker.getTypeAtLocation(node)
  return isStandardLibraryType(context, type, undefined)
}

export function transformPromiseConstructorCall(
  context: TransformationContext,
  node: ts.CallExpression,
  calledMethod: ts.PropertyAccessExpression
): luaExpressions.Expression | undefined {
  const signature = context.checker.getResolvedSignature(node)
  const params = context.transformArguments(node.arguments, signature)

  const expressionName = calledMethod.name.text
  switch (expressionName) {
    case "all":
      return transformLuaLibFunction(context, LuaLibFeature.PromiseAll, node, ...params)
    case "allSettled":
      return transformLuaLibFunction(context, LuaLibFeature.PromiseAllSettled, node, ...params)
    case "any":
      return transformLuaLibFunction(context, LuaLibFeature.PromiseAny, node, ...params)
    case "race":
      return transformLuaLibFunction(context, LuaLibFeature.PromiseRace, node, ...params)
    case "resolve":
      importLuaLibFeature(context, LuaLibFeature.Promise)
      return luaExpressions.createCallExpression(
        createStaticPromiseFunctionAccessor("resolve", calledMethod),
        params,
        node
      )
    case "reject":
      importLuaLibFeature(context, LuaLibFeature.Promise)
      return luaExpressions.createCallExpression(
        createStaticPromiseFunctionAccessor("reject", calledMethod),
        params,
        node
      )
    default:
      context.addDiagnostic(unsupportedProperty(calledMethod.name, "Promise", expressionName))
  }
}
