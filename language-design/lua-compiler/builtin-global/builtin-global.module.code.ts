import type * as ts from "typescript"
import { transformStringConstructorCall } from "../builtin-string/builtin-string.module.code.ts"
import type { TransformationContext } from "../context-transformation-context/context-transformation-context.module.code.ts"
import * as luaExpressions from "../tstl-lua-ast-expressions/tstl-lua-ast-expressions.module.code.ts"
import { LuaLibFeature } from "../tstl-lua-lib/tstl-lua-lib.module.code.ts"
import {
  importLuaLibFeature,
  transformLuaLibFunction,
} from "../tstl-lualib/tstl-lualib.module.code.ts"
import { isNumberType } from "../tstl-typescript/tstl-typescript.module.code.ts"

export function tryTransformBuiltinGlobalCall(
  context: TransformationContext,
  node: ts.CallExpression,
  expressionType: ts.Type
): luaExpressions.Expression | undefined {
  function getParameters() {
    const signature = context.checker.getResolvedSignature(node)
    return context.transformArguments(node.arguments, signature)
  }

  const name = expressionType.symbol.name
  switch (name) {
    case "SymbolConstructor":
      return transformLuaLibFunction(context, LuaLibFeature.Symbol, node, ...getParameters())
    case "NumberConstructor":
      return transformLuaLibFunction(context, LuaLibFeature.Number, node, ...getParameters())
    case "StringConstructor":
      return transformStringConstructorCall(node, ...getParameters())
    case "isNaN":
    case "isFinite": {
      const numberParameters = isNumberType(context, expressionType)
        ? getParameters()
        : [transformLuaLibFunction(context, LuaLibFeature.Number, undefined, ...getParameters())]

      return transformLuaLibFunction(
        context,
        name === "isNaN" ? LuaLibFeature.NumberIsNaN : LuaLibFeature.NumberIsFinite,
        node,
        ...numberParameters
      )
    }
    case "parseFloat":
      return transformLuaLibFunction(context, LuaLibFeature.ParseFloat, node, ...getParameters())
    case "parseInt":
      return transformLuaLibFunction(context, LuaLibFeature.ParseInt, node, ...getParameters())
    case "structuredClone":
      return transformLuaLibFunction(
        context,
        LuaLibFeature.StructuredClone,
        node,
        ...getParameters()
      )
    case "setTimeout":
    case "setInterval":
    case "clearTimeout":
    case "clearInterval":
    case "queueMicrotask": {
      importLuaLibFeature(context, LuaLibFeature.Scheduling)
      const identifierName = `__TS__${name.charAt(0).toUpperCase()}${name.slice(1)}`
      return luaExpressions.createCallExpression(
        luaExpressions.createIdentifier(identifierName),
        getParameters(),
        node
      )
    }
  }
}
