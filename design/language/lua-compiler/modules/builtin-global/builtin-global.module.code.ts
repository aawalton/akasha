import * as luaExpressions from "akasha/design/language/lua-compiler/lua-ast-expressions/lua-ast-expressions.module.code.ts"
import {
  importLuaLibFeature,
  transformLuaLibFunction,
} from "akasha/design/language/lua-compiler/lualib-call/lualib-call.module.code.ts"
import { LuaLibFeature } from "akasha/design/language/lua-compiler/lualib-features/lualib-features.module.code.ts"
import { transformStringConstructorCall } from "akasha/design/language/lua-compiler/modules/builtin-string/builtin-string.module.code.ts"
import type { TransformationContext } from "akasha/design/language/lua-compiler/modules/context-transformation-context/context-transformation-context.module.code.ts"
import { isNumberType } from "akasha/design/language/lua-compiler/typescript/typescript.module.code.ts"
import type * as ts from "typescript"

const schedulingFeatures = new Map<string, LuaLibFeature>([
  ["clearInterval", LuaLibFeature.ClearInterval],
  ["clearTimeout", LuaLibFeature.ClearTimeout],
  ["queueMicrotask", LuaLibFeature.QueueMicrotask],
  ["setInterval", LuaLibFeature.SetInterval],
  ["setTimeout", LuaLibFeature.SetTimeout],
])

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
    default: {
      const scheduled = schedulingFeatures.get(name)
      if (scheduled === undefined) return undefined
      importLuaLibFeature(context, scheduled)
      const identifierName = `__TS__${name.charAt(0).toUpperCase()}${name.slice(1)}`
      return luaExpressions.createCallExpression(
        luaExpressions.createIdentifier(identifierName),
        getParameters(),
        node
      )
    }
  }
}
