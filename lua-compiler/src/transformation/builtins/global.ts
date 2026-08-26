import type * as ts from "typescript"
import * as luaExpressions from "../../LuaAST-expressions"
import type { TransformationContext } from "../context/transformation-context"
import { importLuaLibFeature, transformLuaLibFunction } from "../utils/lualib"
import { LuaLibFeature } from "../../LuaLib"
import { isNumberType } from "../utils/typescript/types"
import { transformStringConstructorCall } from "./string"

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
