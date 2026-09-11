import type { TransformationContext } from "akasha/design/language/lua-compiler/context-transformation-context/context-transformation-context.module.code.ts"
import type * as luaExpressions from "akasha/design/language/lua-compiler/lua-ast-expressions/lua-ast-expressions.module.code.ts"
import { transformLuaLibFunction } from "akasha/design/language/lua-compiler/lualib-call/lualib-call.module.code.ts"
import { LuaLibFeature } from "akasha/design/language/lua-compiler/lualib-features/lualib-features.module.code.ts"
import { unsupportedProperty } from "akasha/design/language/lua-compiler/transform-diagnostics/transform-diagnostics.module.code.ts"
import type * as ts from "typescript"

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
