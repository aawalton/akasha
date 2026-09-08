import type * as ts from "typescript"
import type { TransformationContext } from "../context-transformation-context/context-transformation-context.module.code.ts"
import type * as luaExpressions from "../lua-ast-expressions/lua-ast-expressions.module.code.ts"
import { transformLuaLibFunction } from "../lualib-call/lualib-call.module.code.ts"
import { LuaLibFeature } from "../lualib-features/lualib-features.module.code.ts"
import { unsupportedProperty } from "../transform-diagnostics/transform-diagnostics.module.code.ts"

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
      return undefined
  }
}
