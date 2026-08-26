import * as ts from "typescript"

import * as luaExpressions from "../../LuaAST-expressions"
import type { TransformationContext } from "../context/transformation-context"
import { unsupportedProperty } from "../utils/diagnostics"
import { importLuaLibFeature } from "../utils/lualib"
import { LuaLibFeature } from "../../LuaLib"

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
      const functionIdentifier = luaExpressions.createIdentifier(`__TS__SymbolRegistry${upperMethodName}`)
      return luaExpressions.createCallExpression(functionIdentifier, parameters, node)
    }
    default:
      context.addDiagnostic(unsupportedProperty(calledMethod.name, "Symbol", methodName))
  }
}
