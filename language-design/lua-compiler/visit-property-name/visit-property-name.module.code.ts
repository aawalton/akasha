import * as ts from "typescript"
import type { TransformationContext } from "../context-transformation-context/context-transformation-context.module.code.ts"
import * as luaExpressions from "../tstl-lua-ast-expressions/tstl-lua-ast-expressions.module.code.ts"

export function transformPropertyName(
  context: TransformationContext,
  node: ts.PropertyName
): luaExpressions.Expression {
  if (ts.isComputedPropertyName(node)) {
    return context.transformExpression(node.expression)
  } else if (ts.isIdentifier(node)) {
    return luaExpressions.createStringLiteral(node.text)
  } else if (ts.isPrivateIdentifier(node)) {
    throw new Error("PrivateIdentifier is not supported")
  } else {
    return context.transformExpression(node)
  }
}
