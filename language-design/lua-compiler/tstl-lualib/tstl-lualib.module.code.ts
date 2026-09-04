import type * as ts from "typescript"
import type { TransformationContext } from "../context-transformation-context/context-transformation-context.module.code.ts"
import * as luaExpressions from "../tstl-lua-ast-expressions/tstl-lua-ast-expressions.module.code.ts"
import { LuaLibFeature } from "../tstl-lua-lib/tstl-lua-lib.module.code.ts"

export function importLuaLibFeature(
  context: TransformationContext,
  feature: LuaLibFeature
): undefined {
  context.usedLuaLibFeatures.add(feature)
}

export function transformLuaLibFunction(
  context: TransformationContext,
  feature: LuaLibFeature,
  tsParent?: ts.Node,
  ...params: readonly luaExpressions.Expression[]
): luaExpressions.CallExpression {
  importLuaLibFeature(context, feature)
  const functionIdentifier = luaExpressions.createIdentifier(`__TS__${feature}`)
  return luaExpressions.createCallExpression(functionIdentifier, params, tsParent)
}

export function createPromiseIdentifier(original: ts.Node) {
  return luaExpressions.createIdentifier(`__TS__${LuaLibFeature.Promise}`, original)
}

export function createStaticPromiseFunctionAccessor(functionName: string, node: ts.Node) {
  return luaExpressions.createTableIndexExpression(
    luaExpressions.createIdentifier(`__TS__${LuaLibFeature.Promise}`),
    luaExpressions.createStringLiteral(functionName),
    node
  )
}
