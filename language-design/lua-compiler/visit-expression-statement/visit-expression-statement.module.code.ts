import type * as ts from "typescript"
import { tempSymbolId } from "../context-temp-symbol-id/context-temp-symbol-id.module.code.ts"
import type { FunctionVisitor } from "../context-visitors/context-visitors.module.code.ts"
import * as luaExpressions from "../tstl-lua-ast-expressions/tstl-lua-ast-expressions.module.code.ts"
import * as luaStatements from "../tstl-lua-ast-statements/tstl-lua-ast-statements.module.code.ts"
import { transformUnaryExpressionStatement } from "../visit-unary-expression/visit-unary-expression.module.code.ts"
import { transformBinaryExpressionStatement } from "../visitors-binary-expression/visitors-binary-expression.module.code.ts"

export const transformExpressionStatement: FunctionVisitor<ts.ExpressionStatement> = (
  node,
  context
) => {
  const unaryExpressionResult = transformUnaryExpressionStatement(context, node)
  if (unaryExpressionResult) {
    return unaryExpressionResult
  }

  const binaryExpressionResult = transformBinaryExpressionStatement(context, node)
  if (binaryExpressionResult) {
    return binaryExpressionResult
  }

  return wrapInStatement(context.transformExpression(node.expression))
}

export function wrapInStatement(
  result: luaExpressions.Expression
): luaStatements.Statement | undefined {
  const isTempVariable = luaExpressions.isIdentifier(result) && result.symbolId === tempSymbolId
  if (isTempVariable) {
    return undefined
  }
  const isSyntheticExpression =
    (luaExpressions.isIdentifier(result) || luaExpressions.isLiteral(result)) &&
    result.line === undefined
  if (isSyntheticExpression) {
    return undefined
  }
  if (luaExpressions.isCallExpression(result) || luaExpressions.isMethodCallExpression(result)) {
    return luaStatements.createExpressionStatement(result)
  }
  return luaStatements.createVariableDeclarationStatement(
    luaExpressions.createAnonymousIdentifier(),
    result
  )
}
