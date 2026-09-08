import type * as ts from "typescript"
import type { TransformationContext } from "../context-transformation-context/context-transformation-context.module.code.ts"
import { importLuaLibFeature } from "../lualib-call/lualib-call.module.code.ts"
import { LuaLibFeature } from "../lualib-features/lualib-features.module.code.ts"
import { unsupportedProperty } from "../transform-diagnostics/transform-diagnostics.module.code.ts"
import * as luaExpressions from "../tstl-lua-ast-expressions/tstl-lua-ast-expressions.module.code.ts"

export function transformSymbolConstructorCall(
  context: TransformationContext,
  node: ts.CallExpression,
  calledMethod: ts.PropertyAccessExpression
): luaExpressions.CallExpression | undefined {
  const signature = context.checker.getResolvedSignature(node)
  const parameters = context.transformArguments(node.arguments, signature)
  const methodName = calledMethod.name.text
  switch (methodName) {
    case "for":
    case "keyFor": {
      importLuaLibFeature(context, LuaLibFeature.SymbolRegistry)
      const upperMethodName = (methodName[0] ?? "").toUpperCase() + methodName.slice(1)
      const functionIdentifier = luaExpressions.createIdentifier(
        `__TS__SymbolRegistry${upperMethodName}`
      )
      return luaExpressions.createCallExpression(functionIdentifier, parameters, node)
    }
    default:
      context.addDiagnostic(unsupportedProperty(calledMethod.name, "Symbol", methodName))
      return undefined
  }
}
