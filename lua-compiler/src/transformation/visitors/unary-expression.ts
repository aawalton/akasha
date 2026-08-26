import * as ts from "typescript"
import * as luaCore from "../../LuaAST-core"
import * as luaStatements from "../../LuaAST-statements"
import * as luaExpressions from "../../LuaAST-expressions"
import { assertNever } from "@shared/utils-narrow/assert-never"
import type { TransformationContext } from "../context/transformation-context"
import type { FunctionVisitor } from "../context/visitors"
import { transformLuaLibFunction } from "../utils/lualib"
import { LuaLibFeature } from "../../LuaLib"
import { isNumberType } from "../utils/typescript/typescript"
import { transformUnaryBitOperation } from "./binary-expression/bit"
import {
  transformCompoundAssignmentExpression,
  transformCompoundAssignmentStatement,
} from "./binary-expression/compound"

export function transformUnaryExpressionStatement(
  context: TransformationContext,
  node: ts.ExpressionStatement
): readonly luaStatements.Statement[] | undefined {
  const expression = ts.isExpressionStatement(node) ? node.expression : node
  if (
    ts.isPrefixUnaryExpression(expression) &&
    (expression.operator === ts.SyntaxKind.PlusPlusToken ||
      expression.operator === ts.SyntaxKind.MinusMinusToken)
  ) {
    const replacementOperator =
      expression.operator === ts.SyntaxKind.PlusPlusToken
        ? ts.SyntaxKind.PlusToken
        : ts.SyntaxKind.MinusToken

    return transformCompoundAssignmentStatement(
      context,
      expression,
      expression.operand,
      ts.factory.createNumericLiteral(1),
      replacementOperator
    )
  } else if (ts.isPostfixUnaryExpression(expression)) {
    const replacementOperator =
      expression.operator === ts.SyntaxKind.PlusPlusToken
        ? ts.SyntaxKind.PlusToken
        : ts.SyntaxKind.MinusToken

    return transformCompoundAssignmentStatement(
      context,
      expression,
      expression.operand,
      ts.factory.createNumericLiteral(1),
      replacementOperator
    )
  }
}

export const transformPostfixUnaryExpression: FunctionVisitor<ts.PostfixUnaryExpression> = (
  expression,
  context
) => {
  switch (expression.operator) {
    case ts.SyntaxKind.PlusPlusToken:
      return transformCompoundAssignmentExpression(
        context,
        expression,
        expression.operand,
        ts.factory.createNumericLiteral(1),
        ts.SyntaxKind.PlusToken,
        true
      )

    case ts.SyntaxKind.MinusMinusToken:
      return transformCompoundAssignmentExpression(
        context,
        expression,
        expression.operand,
        ts.factory.createNumericLiteral(1),
        ts.SyntaxKind.MinusToken,
        true
      )

    default:
      assertNever(expression.operator)
  }
}

export const transformPrefixUnaryExpression: FunctionVisitor<ts.PrefixUnaryExpression> = (
  expression,
  context
) => {
  switch (expression.operator) {
    case ts.SyntaxKind.PlusPlusToken:
      return transformCompoundAssignmentExpression(
        context,
        expression,
        expression.operand,
        ts.factory.createNumericLiteral(1),
        ts.SyntaxKind.PlusToken,
        false
      )

    case ts.SyntaxKind.MinusMinusToken:
      return transformCompoundAssignmentExpression(
        context,
        expression,
        expression.operand,
        ts.factory.createNumericLiteral(1),
        ts.SyntaxKind.MinusToken,
        false
      )

    case ts.SyntaxKind.PlusToken: {
      const operand = context.transformExpression(expression.operand)
      const type = context.checker.getTypeAtLocation(expression.operand)
      if (isNumberType(context, type)) {
        return operand
      } else {
        return transformLuaLibFunction(context, LuaLibFeature.Number, expression, operand)
      }
    }
    case ts.SyntaxKind.MinusToken: {
      const operand = context.transformExpression(expression.operand)
      const type = context.checker.getTypeAtLocation(expression.operand)
      if (isNumberType(context, type)) {
        return luaExpressions.createUnaryExpression(operand, luaCore.SyntaxKind.NegationOperator)
      } else {
        return transformLuaLibFunction(
          context,
          LuaLibFeature.Number,
          expression,
          luaExpressions.createUnaryExpression(operand, luaCore.SyntaxKind.NegationOperator)
        )
      }
    }
    case ts.SyntaxKind.ExclamationToken:
      return luaExpressions.createUnaryExpression(
        context.transformExpression(expression.operand),
        luaCore.SyntaxKind.NotOperator
      )

    case ts.SyntaxKind.TildeToken:
      return transformUnaryBitOperation(
        context,
        expression,
        context.transformExpression(expression.operand),
        luaCore.SyntaxKind.BitwiseNotOperator
      )

    default:
      assertNever(expression.operator)
  }
}
