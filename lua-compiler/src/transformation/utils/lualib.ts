import type * as ts from "typescript"
import * as luaExpressions from "../../LuaAST-expressions"
import { LuaLibFeature } from "../../LuaLib"
import type { TransformationContext } from "../context/transformation-context"

export function importLuaLibFeature(context: TransformationContext, feature: LuaLibFeature): undefined {
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
