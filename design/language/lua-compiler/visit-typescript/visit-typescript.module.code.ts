import { validateAssignment } from "akasha/design/language/lua-compiler/assignment-validation/assignment-validation.module.code.ts"
import type {
  FunctionVisitor,
  Visitors,
} from "akasha/design/language/lua-compiler/context-visitors/context-visitors.module.code.ts"
import * as ts from "typescript"

const transformAssertionExpression: FunctionVisitor<ts.AssertionExpression> = (
  expression,
  context
) => {
  if (!ts.isConstTypeReference(expression.type)) {
    validateAssignment(
      context,
      expression,
      context.checker.getTypeAtLocation(expression.expression),
      context.checker.getTypeAtLocation(expression.type)
    )
  }

  return context.transformExpression(expression.expression)
}

export const typescriptVisitors: Visitors = {
  [ts.SyntaxKind.TypeAliasDeclaration]: () => undefined,
  [ts.SyntaxKind.InterfaceDeclaration]: () => undefined,

  [ts.SyntaxKind.NonNullExpression]: (node, context) =>
    context.transformExpression(node.expression),
  [ts.SyntaxKind.ExpressionWithTypeArguments]: (node, context) =>
    context.transformExpression(node.expression),
  [ts.SyntaxKind.SatisfiesExpression]: (node, context) =>
    context.transformExpression(node.expression),
  [ts.SyntaxKind.AsExpression]: transformAssertionExpression,
  [ts.SyntaxKind.TypeAssertionExpression]: transformAssertionExpression,
  [ts.SyntaxKind.NotEmittedStatement]: () => undefined,
}
