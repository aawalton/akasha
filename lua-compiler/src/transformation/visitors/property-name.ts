import * as ts from "typescript"
import * as luaExpressions from "../../LuaAST-expressions"
import type { TransformationContext } from "../context/transformation-context"

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
