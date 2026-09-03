import type * as ts from "typescript"
import type { TransformationContext } from "../context-transformation-context/context-transformation-context.module.code.ts"
import { unsupportedProperty } from "../tstl-diagnostics/tstl-diagnostics.module.code.ts"
import type * as luaExpressions from "../tstl-lua-ast-expressions/tstl-lua-ast-expressions.module.code.ts"
import { LuaLibFeature } from "../tstl-lua-lib/tstl-lua-lib.module.code.ts"
import { transformLuaLibFunction } from "../tstl-lualib/tstl-lualib.module.code.ts"

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
