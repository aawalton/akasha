import type * as ts from "typescript"
import * as luaStatements from "../../LuaAST-statements"
import * as luaExpressions from "../../LuaAST-expressions"
import { tempSymbolId } from "../context/temp-symbol-id"
import { type FunctionVisitor } from "../context/visitors"
import { transformBinaryExpressionStatement } from "./binary-expression"
import { transformUnaryExpressionStatement } from "./unary-expression"

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

export function wrapInStatement(result: luaExpressions.Expression): luaStatements.Statement | undefined {
  const isTempVariable = luaExpressions.isIdentifier(result) && result.symbolId === tempSymbolId
  if (isTempVariable) {
    return undefined
  }
  const isSyntheticExpression =
    (luaExpressions.isIdentifier(result) || luaExpressions.isLiteral(result)) && result.line === undefined
  if (isSyntheticExpression) {
    return undefined
  }
  if (luaExpressions.isCallExpression(result) || luaExpressions.isMethodCallExpression(result)) {
    return luaStatements.createExpressionStatement(result)
  }
  return luaStatements.createVariableDeclarationStatement(luaExpressions.createAnonymousIdentifier(), result)
}
