import type { TransformationContext } from "akasha/design/language/lua-compiler/context-transformation-context/context-transformation-context.module.code.ts"
import type { FunctionVisitor } from "akasha/design/language/lua-compiler/context-visitors/context-visitors.module.code.ts"
import { wrapInToStringForConcat } from "akasha/design/language/lua-compiler/lua-ast/lua-ast.module.code.ts"
import * as luaCore from "akasha/design/language/lua-compiler/lua-ast-core/lua-ast-core.module.code.ts"
import * as luaExpressions from "akasha/design/language/lua-compiler/lua-ast-expressions/lua-ast-expressions.module.code.ts"
import * as luaStatements from "akasha/design/language/lua-compiler/lua-ast-statements/lua-ast-statements.module.code.ts"
import { transformLuaLibFunction } from "akasha/design/language/lua-compiler/lualib-call/lualib-call.module.code.ts"
import { LuaLibFeature } from "akasha/design/language/lua-compiler/lualib-features/lualib-features.module.code.ts"
import { LuaTarget } from "akasha/design/language/lua-compiler/modules/compiler-options/compiler-options.module.code.ts"
import {
  transformInPrecedingStatementScope,
  type WithPrecedingStatements,
} from "akasha/design/language/lua-compiler/preceding-statements/preceding-statements.module.code.ts"
import {
  canBeFalsyWhenNotNull,
  isEqualsAssignment,
  isStandardLibraryType,
  isStringType,
} from "akasha/design/language/lua-compiler/typescript/typescript.module.code.ts"
import { assert, cast } from "akasha/design/language/lua-compiler/utils/utils.module.code.ts"
import {
  transformAssignmentExpression,
  transformAssignmentStatement,
} from "akasha/design/language/lua-compiler/visit-assignments/visit-assignments.module.code.ts"
import { transformBinaryOperationHolder } from "akasha/design/language/lua-compiler/visit-binary-operation-deps/visit-binary-operation-deps.module.code.ts"
import {
  type BitOperator,
  isBitOperator,
  transformBinaryBitOperation,
} from "akasha/design/language/lua-compiler/visit-bit/visit-bit.module.code.ts"
import {
  isCompoundAssignmentToken,
  transformCompoundAssignmentExpression,
  transformCompoundAssignmentStatement,
  unwrapCompoundAssignmentToken,
} from "akasha/design/language/lua-compiler/visit-compound/visit-compound.module.code.ts"
import { requireTransformTypeOfBinaryExpression } from "akasha/design/language/lua-compiler/visit-typeof-deps/visit-typeof-deps.module.code.ts"
import { assertNever } from "akasha/utils/narrow/modules/assert-never/assert-never.module.code.ts"
import * as ts from "typescript"

type ShortCircuitOperator =
  | ts.SyntaxKind.AmpersandAmpersandToken
  | ts.SyntaxKind.BarBarToken
  | ts.SyntaxKind.QuestionQuestionToken

const isShortCircuitOperator = (value: unknown): value is ShortCircuitOperator =>
  value === ts.SyntaxKind.AmpersandAmpersandToken ||
  value === ts.SyntaxKind.BarBarToken ||
  value === ts.SyntaxKind.QuestionQuestionToken

export type SimpleOperator =
  | ts.AdditiveOperatorOrHigher
  | Exclude<ts.RelationalOperator, ts.SyntaxKind.InstanceOfKeyword | ts.SyntaxKind.InKeyword>
  | ts.EqualityOperator
  | ts.LogicalOperator

const simpleOperatorsToLua: Record<SimpleOperator, luaCore.BinaryOperator> = {
  [ts.SyntaxKind.AmpersandAmpersandToken]: luaCore.SyntaxKind.AndOperator,
  [ts.SyntaxKind.BarBarToken]: luaCore.SyntaxKind.OrOperator,
  [ts.SyntaxKind.PlusToken]: luaCore.SyntaxKind.AdditionOperator,
  [ts.SyntaxKind.MinusToken]: luaCore.SyntaxKind.SubtractionOperator,
  [ts.SyntaxKind.AsteriskToken]: luaCore.SyntaxKind.MultiplicationOperator,
  [ts.SyntaxKind.AsteriskAsteriskToken]: luaCore.SyntaxKind.PowerOperator,
  [ts.SyntaxKind.SlashToken]: luaCore.SyntaxKind.DivisionOperator,
  [ts.SyntaxKind.PercentToken]: luaCore.SyntaxKind.ModuloOperator,
  [ts.SyntaxKind.GreaterThanToken]: luaCore.SyntaxKind.GreaterThanOperator,
  [ts.SyntaxKind.GreaterThanEqualsToken]: luaCore.SyntaxKind.GreaterEqualOperator,
  [ts.SyntaxKind.LessThanToken]: luaCore.SyntaxKind.LessThanOperator,
  [ts.SyntaxKind.LessThanEqualsToken]: luaCore.SyntaxKind.LessEqualOperator,
  [ts.SyntaxKind.EqualsEqualsToken]: luaCore.SyntaxKind.EqualityOperator,
  [ts.SyntaxKind.EqualsEqualsEqualsToken]: luaCore.SyntaxKind.EqualityOperator,
  [ts.SyntaxKind.ExclamationEqualsToken]: luaCore.SyntaxKind.InequalityOperator,
  [ts.SyntaxKind.ExclamationEqualsEqualsToken]: luaCore.SyntaxKind.InequalityOperator,
}

function transformBinaryOperationWithNoPrecedingStatements(
  context: TransformationContext,
  left: luaExpressions.Expression,
  right: luaExpressions.Expression,
  operator: BitOperator | SimpleOperator | ts.SyntaxKind.QuestionQuestionToken,
  node: ts.Node
): luaExpressions.Expression {
  if (isBitOperator(operator)) {
    return transformBinaryBitOperation(context, node, left, right, operator)
  }

  if (operator === ts.SyntaxKind.QuestionQuestionToken) {
    assert(ts.isBinaryExpression(node))
    return transformNullishCoalescingOperationNoPrecedingStatements(context, node, left, right)
  }

  if (operator === ts.SyntaxKind.PercentToken && context.luaTarget === LuaTarget.Lua50) {
    const mathMod = luaExpressions.createTableIndexExpression(
      luaExpressions.createIdentifier("math"),
      luaExpressions.createStringLiteral("mod")
    )
    return luaExpressions.createCallExpression(mathMod, [left, right], node)
  }

  let luaOperator = simpleOperatorsToLua[operator]

  if (operator === ts.SyntaxKind.PlusToken && ts.isBinaryExpression(node)) {
    const typeLeft = context.checker.getTypeAtLocation(node.left)
    const typeRight = context.checker.getTypeAtLocation(node.right)

    const isLeftString = isStringType(context, typeLeft)
    const isRightString = isStringType(context, typeRight)
    if (isLeftString || isRightString) {
      left = isLeftString ? left : wrapInToStringForConcat(left)
      right = isRightString ? right : wrapInToStringForConcat(right)
      luaOperator = luaCore.SyntaxKind.ConcatOperator
    }
  }

  return luaExpressions.createBinaryExpression(left, right, luaOperator, node)
}

export function createShortCircuitBinaryExpressionPrecedingStatements(
  context: TransformationContext,
  lhs: luaExpressions.Expression,
  rhs: luaExpressions.Expression,
  rightPrecedingStatements: readonly luaStatements.Statement[],
  operator: ShortCircuitOperator,
  node?: ts.BinaryExpression
): WithPrecedingStatements<luaExpressions.Expression> {
  const conditionIdentifier = context.createTempNameForLuaExpression(lhs)
  const assignmentStatement = luaStatements.createVariableDeclarationStatement(
    conditionIdentifier,
    lhs,
    node?.left
  )

  let condition: luaExpressions.Expression
  switch (operator) {
    case ts.SyntaxKind.BarBarToken:
      condition = luaExpressions.createUnaryExpression(
        luaExpressions.cloneIdentifier(conditionIdentifier),
        luaCore.SyntaxKind.NotOperator,
        node
      )
      break
    case ts.SyntaxKind.AmpersandAmpersandToken:
      condition = luaExpressions.cloneIdentifier(conditionIdentifier)
      break
    case ts.SyntaxKind.QuestionQuestionToken:
      condition = luaExpressions.createBinaryExpression(
        luaExpressions.cloneIdentifier(conditionIdentifier),
        luaExpressions.createNilLiteral(),
        luaCore.SyntaxKind.EqualityOperator,
        node
      )
      break
    default:
      assertNever(operator)
  }

  const ifStatement = luaStatements.createIfStatement(
    condition,
    luaStatements.createBlock([
      ...rightPrecedingStatements,
      luaStatements.createAssignmentStatement(conditionIdentifier, rhs),
    ]),
    undefined,
    node?.left
  )
  return { precedingStatements: [assignmentStatement, ifStatement], result: conditionIdentifier }
}

function transformShortCircuitBinaryExpression(
  context: TransformationContext,
  node: ts.BinaryExpression,
  operator: ShortCircuitOperator
): WithPrecedingStatements<luaExpressions.Expression> {
  const lhs = context.transformExpression(node.left)
  const { precedingStatements, result } = transformInPrecedingStatementScope(context, () =>
    context.transformExpression(node.right)
  )
  return transformBinaryOperation(context, lhs, result, precedingStatements, operator, node)
}

export function transformBinaryOperation(
  context: TransformationContext,
  left: luaExpressions.Expression,
  right: luaExpressions.Expression,
  rightPrecedingStatements: readonly luaStatements.Statement[],
  operator: BitOperator | SimpleOperator | ts.SyntaxKind.QuestionQuestionToken,
  node: ts.Node
): WithPrecedingStatements<luaExpressions.Expression> {
  if (rightPrecedingStatements.length > 0 && isShortCircuitOperator(operator)) {
    assert(ts.isBinaryExpression(node))
    return createShortCircuitBinaryExpressionPrecedingStatements(
      context,
      left,
      right,
      rightPrecedingStatements,
      operator,
      node
    )
  }

  return {
    precedingStatements: rightPrecedingStatements,
    result: transformBinaryOperationWithNoPrecedingStatements(context, left, right, operator, node),
  }
}

export const transformBinaryExpression: FunctionVisitor<ts.BinaryExpression> = (node, context) => {
  const operator = node.operatorToken.kind

  const typeOfResult = requireTransformTypeOfBinaryExpression()(context, node)
  if (typeOfResult) {
    return typeOfResult
  }

  if (isCompoundAssignmentToken(operator)) {
    const token = unwrapCompoundAssignmentToken(operator)
    return transformCompoundAssignmentExpression(context, node, node.left, node.right, token, false)
  }

  switch (operator) {
    case ts.SyntaxKind.EqualsToken:
      return transformAssignmentExpression(context, cast(node, isEqualsAssignment))

    case ts.SyntaxKind.InKeyword: {
      const lhs = context.transformExpression(node.left)
      const rhs = context.transformExpression(node.right)
      const indexExpression = luaExpressions.createTableIndexExpression(rhs, lhs)
      return luaExpressions.createBinaryExpression(
        indexExpression,
        luaExpressions.createNilLiteral(),
        luaCore.SyntaxKind.InequalityOperator,
        node
      )
    }

    case ts.SyntaxKind.InstanceOfKeyword: {
      const lhs = context.transformExpression(node.left)
      const rhs = context.transformExpression(node.right)
      const rhsType = context.checker.getTypeAtLocation(node.right)

      if (isStandardLibraryType(context, rhsType, "ObjectConstructor")) {
        return transformLuaLibFunction(context, LuaLibFeature.InstanceOfObject, node, lhs)
      }

      return transformLuaLibFunction(context, LuaLibFeature.InstanceOf, node, lhs, rhs)
    }

    case ts.SyntaxKind.CommaToken: {
      const statements = context.transformStatements(
        ts.factory.createExpressionStatement(node.left)
      )
      const { precedingStatements, result } = transformInPrecedingStatementScope(context, () =>
        context.transformExpression(node.right)
      )
      context.addPrecedingStatements([...statements, ...precedingStatements])
      return result
    }

    case ts.SyntaxKind.QuestionQuestionToken:
    case ts.SyntaxKind.AmpersandAmpersandToken:
    case ts.SyntaxKind.BarBarToken: {
      const { precedingStatements, result } = transformShortCircuitBinaryExpression(
        context,
        node,
        operator
      )
      context.addPrecedingStatements(precedingStatements)
      return result
    }

    default: {
      const {
        precedingStatements: orderedExpressionPrecedingStatements,
        result: [lhs, rhs],
      } = transformInPrecedingStatementScope(context, () =>
        context.transformOrderedExpressions([node.left, node.right])
      )
      assert(lhs !== undefined && rhs !== undefined)

      const { precedingStatements, result } = transformBinaryOperation(
        context,
        lhs,
        rhs,
        orderedExpressionPrecedingStatements,
        operator,
        node
      )
      context.addPrecedingStatements(precedingStatements)
      return result
    }
  }
}

export function transformBinaryExpressionStatement(
  context: TransformationContext,
  node: ts.ExpressionStatement
): readonly luaStatements.Statement[] | luaStatements.Statement | undefined {
  const expression = node.expression
  if (!ts.isBinaryExpression(expression)) return
  const operator = expression.operatorToken.kind

  if (isCompoundAssignmentToken(operator)) {
    const token = unwrapCompoundAssignmentToken(operator)
    return transformCompoundAssignmentStatement(
      context,
      expression,
      expression.left,
      expression.right,
      token
    )
  } else if (operator === ts.SyntaxKind.EqualsToken) {
    return transformAssignmentStatement(context, cast(expression, isEqualsAssignment))
  } else if (operator === ts.SyntaxKind.CommaToken) {
    const statements = [
      ...context.transformStatements(ts.factory.createExpressionStatement(expression.left)),
      ...context.transformStatements(ts.factory.createExpressionStatement(expression.right)),
    ]

    return luaStatements.createDoStatement(statements, expression)
  }
}

function transformNullishCoalescingOperationNoPrecedingStatements(
  context: TransformationContext,
  node: ts.BinaryExpression,
  transformedLeft: luaExpressions.Expression,
  transformedRight: luaExpressions.Expression
): luaExpressions.Expression {
  const lhsType = context.checker.getTypeAtLocation(node.left)

  if (canBeFalsyWhenNotNull(context, lhsType)) {
    const { precedingStatements, result } = createShortCircuitBinaryExpressionPrecedingStatements(
      context,
      transformedLeft,
      transformedRight,
      [],
      ts.SyntaxKind.QuestionQuestionToken,
      node
    )
    context.addPrecedingStatements(precedingStatements)
    return result
  } else {
    return luaExpressions.createBinaryExpression(
      transformedLeft,
      transformedRight,
      luaCore.SyntaxKind.OrOperator,
      node
    )
  }
}

transformBinaryOperationHolder.fn = transformBinaryOperation
