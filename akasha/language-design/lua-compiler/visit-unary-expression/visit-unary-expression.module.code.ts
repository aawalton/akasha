import { assertNever } from "@akasha/utils-narrow/assert-never"
import * as ts from "typescript"
import type { TransformationContext } from "../context-transformation-context/context-transformation-context.module.code.ts"
import type { FunctionVisitor } from "../context-visitors/context-visitors.module.code.ts"
import * as luaCore from "../tstl-lua-ast-core/tstl-lua-ast-core.module.code.ts"
import * as luaExpressions from "../tstl-lua-ast-expressions/tstl-lua-ast-expressions.module.code.ts"
import type * as luaStatements from "../tstl-lua-ast-statements/tstl-lua-ast-statements.module.code.ts"
import { LuaLibFeature } from "../tstl-lua-lib/tstl-lua-lib.module.code.ts"
import { transformLuaLibFunction } from "../tstl-lualib/tstl-lualib.module.code.ts"
import { isNumberType } from "../tstl-typescript/tstl-typescript.module.code.ts"
import { transformUnaryBitOperation } from "../visit-bit/visit-bit.module.code.ts"
import {
  transformCompoundAssignmentExpression,
  transformCompoundAssignmentStatement,
} from "../visit-compound/visit-compound.module.code.ts"

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
