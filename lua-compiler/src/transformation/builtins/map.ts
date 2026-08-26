import type * as ts from "typescript"
import * as luaExpressions from "../../LuaAST-expressions"
import type { TransformationContext } from "../context/transformation-context"
import { unsupportedProperty } from "../utils/diagnostics"
import { transformLuaLibFunction } from "../utils/lualib"
import { LuaLibFeature } from "../../LuaLib"

export function transformMapConstructorCall(
  context: TransformationContext,
  node: ts.CallExpression,
  calledMethod: ts.PropertyAccessExpression
): luaExpressions.Expression | undefined {
  const args = context.transformArguments(node.arguments)
  const methodName = calledMethod.name.text

  switch (methodName) {
    case "groupBy":
      return transformLuaLibFunction(context, LuaLibFeature.MapGroupBy, node, ...args)
    default:
      context.addDiagnostic(unsupportedProperty(calledMethod.name, "Map", methodName))
  }
}
