import * as luaExpressions from "akasha/design/language/lua-compiler/lua-ast-expressions/lua-ast-expressions.module.code.ts"
import { importLuaLibFeature } from "akasha/design/language/lua-compiler/lualib-call/lualib-call.module.code.ts"
import { LuaLibFeature } from "akasha/design/language/lua-compiler/lualib-features/lualib-features.module.code.ts"
import type { TransformationContext } from "akasha/design/language/lua-compiler/modules/context-transformation-context/context-transformation-context.module.code.ts"
import { unsupportedProperty } from "akasha/design/language/lua-compiler/transform-diagnostics/transform-diagnostics.module.code.ts"
import type * as ts from "typescript"

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
      importLuaLibFeature(
        context,
        methodName === "for" ? LuaLibFeature.SymbolRegistryFor : LuaLibFeature.SymbolRegistryKeyFor
      )
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
