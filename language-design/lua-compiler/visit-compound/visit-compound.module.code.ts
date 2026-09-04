import { assertNever } from "@akasha/utils-narrow/assert-never"
import * as ts from "typescript"
import type { TransformationContext } from "../context-transformation-context/context-transformation-context.module.code.ts"
import { cannotAssignToNodeOfKind } from "../tstl-diagnostics/tstl-diagnostics.module.code.ts"
import * as luaCore from "../tstl-lua-ast-core/tstl-lua-ast-core.module.code.ts"
import * as luaExpressions from "../tstl-lua-ast-expressions/tstl-lua-ast-expressions.module.code.ts"
import * as luaStatements from "../tstl-lua-ast-statements/tstl-lua-ast-statements.module.code.ts"
import { LuaLibFeature } from "../tstl-lua-lib/tstl-lua-lib.module.code.ts"
import { transformLuaLibFunction } from "../tstl-lualib/tstl-lualib.module.code.ts"
import {
  transformInPrecedingStatementScope,
  type WithPrecedingStatements,
} from "../tstl-preceding-statements/tstl-preceding-statements.module.code.ts"
import { isArrayLength } from "../visit-array-length/visit-array-length.module.code.ts"
import { transformAssignmentWithRightPrecedingStatements } from "../visit-assignments/visit-assignments.module.code.ts"
import { requireTransformBinaryOperation } from "../visit-binary-operation-deps/visit-binary-operation-deps.module.code.ts"

function isLuaExpressionWithSideEffect(expression: luaExpressions.Expression) {
  return !(luaExpressions.isLiteral(expression) || luaExpressions.isIdentifier(expression))
}

function shouldCacheTableIndexExpressions(
  expression: luaExpressions.TableIndexExpression,
  rightPrecedingStatements: readonly luaStatements.Statement[]
) {
  return (
    isLuaExpressionWithSideEffect(expression.table) ||
    isLuaExpressionWithSideEffect(expression.index) ||
    rightPrecedingStatements.length > 0
  )
}

type CompoundAssignmentToken =
  | ts.SyntaxKind.BarToken
  | ts.SyntaxKind.PlusToken
  | ts.SyntaxKind.CaretToken
  | ts.SyntaxKind.MinusToken
  | ts.SyntaxKind.SlashToken
  | ts.SyntaxKind.PercentToken
  | ts.SyntaxKind.AsteriskToken
  | ts.SyntaxKind.AmpersandToken
  | ts.SyntaxKind.AsteriskAsteriskToken
  | ts.SyntaxKind.LessThanLessThanToken
  | ts.SyntaxKind.GreaterThanGreaterThanToken
  | ts.SyntaxKind.GreaterThanGreaterThanGreaterThanToken
  | ts.SyntaxKind.BarBarToken
  | ts.SyntaxKind.AmpersandAmpersandToken
  | ts.SyntaxKind.QuestionQuestionToken

const compoundToAssignmentTokens: Record<ts.CompoundAssignmentOperator, CompoundAssignmentToken> = {
  [ts.SyntaxKind.BarEqualsToken]: ts.SyntaxKind.BarToken,
  [ts.SyntaxKind.PlusEqualsToken]: ts.SyntaxKind.PlusToken,
  [ts.SyntaxKind.CaretEqualsToken]: ts.SyntaxKind.CaretToken,
  [ts.SyntaxKind.MinusEqualsToken]: ts.SyntaxKind.MinusToken,
  [ts.SyntaxKind.SlashEqualsToken]: ts.SyntaxKind.SlashToken,
  [ts.SyntaxKind.PercentEqualsToken]: ts.SyntaxKind.PercentToken,
  [ts.SyntaxKind.AsteriskEqualsToken]: ts.SyntaxKind.AsteriskToken,
  [ts.SyntaxKind.AmpersandEqualsToken]: ts.SyntaxKind.AmpersandToken,
  [ts.SyntaxKind.AsteriskAsteriskEqualsToken]: ts.SyntaxKind.AsteriskAsteriskToken,
  [ts.SyntaxKind.LessThanLessThanEqualsToken]: ts.SyntaxKind.LessThanLessThanToken,
  [ts.SyntaxKind.GreaterThanGreaterThanEqualsToken]: ts.SyntaxKind.GreaterThanGreaterThanToken,
  [ts.SyntaxKind.GreaterThanGreaterThanGreaterThanEqualsToken]:
    ts.SyntaxKind.GreaterThanGreaterThanGreaterThanToken,
  [ts.SyntaxKind.BarBarEqualsToken]: ts.SyntaxKind.BarBarToken,
  [ts.SyntaxKind.AmpersandAmpersandEqualsToken]: ts.SyntaxKind.AmpersandAmpersandToken,
  [ts.SyntaxKind.QuestionQuestionEqualsToken]: ts.SyntaxKind.QuestionQuestionToken,
}

export const isCompoundAssignmentToken = (
  token: ts.BinaryOperator
): token is ts.CompoundAssignmentOperator => token in compoundToAssignmentTokens

export const unwrapCompoundAssignmentToken = (
  token: ts.CompoundAssignmentOperator
): CompoundAssignmentToken => compoundToAssignmentTokens[token]

function transformCompoundAssignment(
  context: TransformationContext,
  expression: ts.Expression,
  lhs: ts.Expression,
  rhs: ts.Expression,
  operator: CompoundAssignmentToken,
  isPostfix: boolean
): WithPrecedingStatements<luaExpressions.Expression> {
  if (isArrayLength(context, lhs)) {
    const { precedingStatements, result: lengthSetterStatement } = transformCompoundLengthSetter(
      context,
      expression,
      lhs,
      rhs,
      operator
    )

    return { precedingStatements, result: lengthSetterStatement.expression }
  }

  const left = context.transformExpression(lhs)
  if (!luaExpressions.isAssignmentLeftHandSideExpression(left)) {
    context.addDiagnostic(cannotAssignToNodeOfKind(expression, left.kind))
    return { precedingStatements: [], result: left }
  }

  const { precedingStatements: rightPrecedingStatements, result: right } =
    transformInPrecedingStatementScope(context, () => context.transformExpression(rhs))

  if (luaExpressions.isTableIndexExpression(left)) {
    const obj = context.createTempNameForLuaExpression(left.table)
    const index = context.createTempNameForLuaExpression(left.index)

    const objAndIndexDeclaration = luaStatements.createVariableDeclarationStatement(
      [obj, index],
      [left.table, left.index]
    )
    const accessExpression = luaExpressions.createTableIndexExpression(obj, index)

    const tmp = context.createTempNameForLuaExpression(left)
    if (isPostfix) {
      const tmpDeclaration = luaStatements.createVariableDeclarationStatement(tmp, accessExpression)
      const { precedingStatements, result: operatorExpression } = requireTransformBinaryOperation()(
        context,
        tmp,
        right,
        rightPrecedingStatements,
        operator,
        expression
      )
      const assignStatement = luaStatements.createAssignmentStatement(
        accessExpression,
        operatorExpression
      )
      return {
        precedingStatements: [
          objAndIndexDeclaration,
          ...precedingStatements,
          tmpDeclaration,
          assignStatement,
        ],
        result: tmp,
      }
    } else {
      if (isSetterSkippingCompoundAssignmentOperator(operator)) {
        return {
          precedingStatements: [
            objAndIndexDeclaration,
            ...transformSetterSkippingCompoundAssignment(
              accessExpression,
              operator,
              right,
              rightPrecedingStatements
            ),
          ],
          result: left,
        }
      }
      const { precedingStatements, result: operatorExpression } = requireTransformBinaryOperation()(
        context,
        accessExpression,
        right,
        rightPrecedingStatements,
        operator,
        expression
      )
      const tmpDeclaration = luaStatements.createVariableDeclarationStatement(
        tmp,
        operatorExpression
      )
      const assignStatement = luaStatements.createAssignmentStatement(accessExpression, tmp)
      return {
        precedingStatements: [
          objAndIndexDeclaration,
          ...precedingStatements,
          tmpDeclaration,
          assignStatement,
        ],
        result: tmp,
      }
    }
  } else if (isPostfix) {
    const tmpIdentifier = context.createTempNameForLuaExpression(left)
    const tmpDeclaration = luaStatements.createVariableDeclarationStatement(tmpIdentifier, left)
    const { precedingStatements, result: operatorExpression } = requireTransformBinaryOperation()(
      context,
      tmpIdentifier,
      right,
      rightPrecedingStatements,
      operator,
      expression
    )
    const assignStatements = transformAssignmentWithRightPrecedingStatements(
      context,
      lhs,
      operatorExpression,
      rightPrecedingStatements
    )
    return {
      precedingStatements: [tmpDeclaration, ...precedingStatements, ...assignStatements],
      result: tmpIdentifier,
    }
  } else {
    if (
      rightPrecedingStatements.length > 0 &&
      isSetterSkippingCompoundAssignmentOperator(operator)
    ) {
      return {
        precedingStatements: transformSetterSkippingCompoundAssignment(
          left,
          operator,
          right,
          rightPrecedingStatements
        ),
        result: left,
      }
    }

    const { precedingStatements, result: operatorExpression } = requireTransformBinaryOperation()(
      context,
      left,
      right,
      rightPrecedingStatements,
      operator,
      expression
    )
    const statements = transformAssignmentWithRightPrecedingStatements(
      context,
      lhs,
      operatorExpression,
      precedingStatements
    )
    return { precedingStatements: statements, result: left }
  }
}

export function transformCompoundAssignmentExpression(
  context: TransformationContext,
  expression: ts.Expression,
  lhs: ts.Expression,
  rhs: ts.Expression,
  operator: CompoundAssignmentToken,
  isPostfix: boolean
): luaExpressions.Expression {
  const { precedingStatements, result } = transformCompoundAssignment(
    context,
    expression,
    lhs,
    rhs,
    operator,
    isPostfix
  )
  context.addPrecedingStatements(precedingStatements)
  return result
}

export function transformCompoundAssignmentStatement(
  context: TransformationContext,
  node: ts.Node,
  lhs: ts.Expression,
  rhs: ts.Expression,
  operator: CompoundAssignmentToken
): readonly luaStatements.Statement[] {
  if (isArrayLength(context, lhs)) {
    const { precedingStatements, result: lengthSetterStatement } = transformCompoundLengthSetter(
      context,
      node,
      lhs,
      rhs,
      operator
    )

    return [...precedingStatements, lengthSetterStatement]
  }

  const left = context.transformExpression(lhs)
  if (!luaExpressions.isAssignmentLeftHandSideExpression(left)) {
    context.addDiagnostic(cannotAssignToNodeOfKind(node, left.kind))
    return []
  }

  const { precedingStatements: rightPrecedingStatements, result: right } =
    transformInPrecedingStatementScope(context, () => context.transformExpression(rhs))

  if (
    luaExpressions.isTableIndexExpression(left) &&
    shouldCacheTableIndexExpressions(left, rightPrecedingStatements)
  ) {
    const obj = context.createTempNameForLuaExpression(left.table)
    const index = context.createTempNameForLuaExpression(left.index)

    const objAndIndexDeclaration = luaStatements.createVariableDeclarationStatement(
      [obj, index],
      [left.table, left.index]
    )
    const accessExpression = luaExpressions.createTableIndexExpression(obj, index)

    if (isSetterSkippingCompoundAssignmentOperator(operator)) {
      return [
        objAndIndexDeclaration,
        ...transformSetterSkippingCompoundAssignment(
          accessExpression,
          operator,
          right,
          rightPrecedingStatements,
          node
        ),
      ]
    }

    const { precedingStatements: rightPrecedingStatements2, result: operatorExpression } =
      requireTransformBinaryOperation()(
        context,
        accessExpression,
        right,
        rightPrecedingStatements,
        operator,
        node
      )
    const assignStatement = luaStatements.createAssignmentStatement(
      accessExpression,
      operatorExpression
    )
    return [objAndIndexDeclaration, ...rightPrecedingStatements2, assignStatement]
  } else {
    if (isSetterSkippingCompoundAssignmentOperator(operator)) {
      return transformSetterSkippingCompoundAssignment(
        left,
        operator,
        right,
        rightPrecedingStatements,
        node
      )
    }

    const { precedingStatements: rightPrecedingStatements2, result: operatorExpression } =
      requireTransformBinaryOperation()(
        context,
        left,
        right,
        rightPrecedingStatements,
        operator,
        node
      )
    return transformAssignmentWithRightPrecedingStatements(
      context,
      lhs,
      operatorExpression,
      rightPrecedingStatements2
    )
  }
}

type SetterSkippingCompoundAssignmentOperator =
  | ts.LogicalOperator
  | ts.SyntaxKind.QuestionQuestionToken

function isSetterSkippingCompoundAssignmentOperator(
  operator: ts.BinaryOperator
): operator is SetterSkippingCompoundAssignmentOperator {
  return (
    operator === ts.SyntaxKind.AmpersandAmpersandToken ||
    operator === ts.SyntaxKind.BarBarToken ||
    operator === ts.SyntaxKind.QuestionQuestionToken
  )
}

function transformSetterSkippingCompoundAssignment(
  lhs: luaExpressions.AssignmentLeftHandSideExpression,
  operator: SetterSkippingCompoundAssignmentOperator,
  right: luaExpressions.Expression,
  rightPrecedingStatements: readonly luaStatements.Statement[],
  node?: ts.Node
): readonly luaStatements.Statement[] {
  let condition: luaExpressions.Expression

  if (operator === ts.SyntaxKind.AmpersandAmpersandToken) {
    condition = lhs
  } else if (operator === ts.SyntaxKind.BarBarToken) {
    condition = luaExpressions.createUnaryExpression(lhs, luaCore.SyntaxKind.NotOperator)
  } else if (operator === ts.SyntaxKind.QuestionQuestionToken) {
    condition = luaExpressions.createBinaryExpression(
      lhs,
      luaExpressions.createNilLiteral(),
      luaCore.SyntaxKind.EqualityOperator
    )
  } else {
    assertNever(operator)
  }

  return [
    luaStatements.createIfStatement(
      condition,
      luaStatements.createBlock([
        ...rightPrecedingStatements,
        luaStatements.createAssignmentStatement(lhs, right, node),
      ]),
      undefined,
      node
    ),
  ]
}

function transformCompoundLengthSetter(
  context: TransformationContext,
  node: ts.Node,
  lhs: ts.PropertyAccessExpression | ts.ElementAccessExpression,
  rhs: ts.Expression,
  operator: CompoundAssignmentToken
): WithPrecedingStatements<luaStatements.ExpressionStatement> {
  const { precedingStatements: rightPrecedingStatements, result: right } =
    transformInPrecedingStatementScope(context, () => context.transformExpression(rhs))
  const table = context.transformExpression(lhs.expression)
  const lengthExpression = luaExpressions.createUnaryExpression(
    table,
    luaCore.SyntaxKind.LengthOperator,
    lhs
  )
  const { precedingStatements, result: operatorExpression } = requireTransformBinaryOperation()(
    context,
    lengthExpression,
    right,
    rightPrecedingStatements,
    operator,
    node
  )

  const arrayLengthAssignment = luaStatements.createExpressionStatement(
    transformLuaLibFunction(context, LuaLibFeature.ArraySetLength, node, table, operatorExpression)
  )

  return { precedingStatements, result: arrayLengthAssignment }
}
