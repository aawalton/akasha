import type * as ts from "typescript"
import * as luaExpressions from "../../LuaAST-expressions"
import type { TransformationContext } from "../context/transformation-context"
import { unsupportedProperty } from "../utils/diagnostics"
import { importLuaLibFeature, transformLuaLibFunction } from "../utils/lualib"
import { LuaLibFeature } from "../../LuaLib"
import { isStandardLibraryType } from "../utils/typescript"

export function isPromiseClass(context: TransformationContext, node: ts.Identifier) {
  if (node.text !== "Promise") return false
  const type = context.checker.getTypeAtLocation(node)
  return isStandardLibraryType(context, type, undefined)
}

export function createPromiseIdentifier(original: ts.Node) {
  return luaExpressions.createIdentifier("__TS__Promise", original)
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

export function createStaticPromiseFunctionAccessor(functionName: string, node: ts.Node) {
  return luaExpressions.createTableIndexExpression(
    luaExpressions.createIdentifier("__TS__Promise"),
    luaExpressions.createStringLiteral(functionName),
    node
  )
}
