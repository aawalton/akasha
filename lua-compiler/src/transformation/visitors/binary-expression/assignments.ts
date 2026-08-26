import * as ts from "typescript"
import { SyntaxKind } from "typescript"
import * as luaStatements from "../../../LuaAST-statements"
import * as luaExpressions from "../../../LuaAST-expressions"
import type { TransformationContext } from "../../context/transformation-context"
import { validateAssignment } from "../../utils/assignment-validation"
import { cannotAssignToNodeOfKind, notAllowedOptionalAssignment } from "../../utils/diagnostics"
import {
  createExportedIdentifier,
  getDependenciesOfSymbol,
  isSymbolExported,
} from "../../utils/export"
import { createBoundedUnpackCall, wrapInTable } from "../../utils/lua-ast"
import { transformLuaLibFunction } from "../../utils/lualib"
import { LuaLibFeature } from "../../../LuaLib"
import { transformInPrecedingStatementScope } from "../../utils/preceding-statements"
import { isDestructuringAssignment } from "../../utils/typescript/nodes"
import { isArrayType } from "../../utils/typescript/types"
import { transformElementAccessArgument } from "../access"
import { isMultiReturnCall } from "../language-extensions/multi"
import { isArrayLength } from "./array-length"
import { requireTransformDestructuringAssignment } from "./destructuring-deps"

export function transformAssignmentLeftHandSideExpression(
  context: TransformationContext,
  node: ts.Expression,
  rightHasPrecedingStatements?: boolean
): luaExpressions.AssignmentLeftHandSideExpression {
  if (
    rightHasPrecedingStatements &&
    (ts.isElementAccessExpression(node) || ts.isPropertyAccessExpression(node))
  ) {
    let table = context.transformExpression(node.expression)
    table = context.moveToPrecedingTemp(table, node.expression)

    let index: luaExpressions.Expression
    if (ts.isElementAccessExpression(node)) {
      index = transformElementAccessArgument(context, node)
      index = context.moveToPrecedingTemp(index, node.argumentExpression)
    } else {
      index = luaExpressions.createStringLiteral(node.name.text, node.name)
    }
    return luaExpressions.createTableIndexExpression(table, index, node)
  }

  const symbol = context.checker.getSymbolAtLocation(node)
  const left = context.transformExpression(node)

  if (luaExpressions.isIdentifier(left) && symbol && isSymbolExported(context, symbol)) {
    return createExportedIdentifier(context, left)
  }

  if (luaExpressions.isAssignmentLeftHandSideExpression(left)) {
    return left
  } else {
    context.addDiagnostic(cannotAssignToNodeOfKind(node, left.kind))
    return luaExpressions.createAnonymousIdentifier()
  }
}

export function transformAssignment(
  context: TransformationContext,
  lhs: ts.Expression,
  right: luaExpressions.Expression,
  rightHasPrecedingStatements?: boolean,
  parent?: ts.Expression
): readonly luaStatements.Statement[] {
  if (ts.isOptionalChain(lhs)) {
    context.addDiagnostic(notAllowedOptionalAssignment(lhs))
    return []
  }

  if (isArrayLength(context, lhs)) {
    const arrayLengthAssignment = luaStatements.createExpressionStatement(
      transformLuaLibFunction(
        context,
        LuaLibFeature.ArraySetLength,
        parent,
        context.transformExpression(lhs.expression),
        right
      )
    )

    return [arrayLengthAssignment]
  }

  if (ts.isPropertyAccessExpression(lhs) || ts.isElementAccessExpression(lhs)) {
    if (lhs.expression.kind === SyntaxKind.SuperKeyword) {
      const symbol = context.checker.getSymbolAtLocation(lhs)
      if (symbol && (symbol.flags & ts.SymbolFlags.SetAccessor) !== 0) {
        return [
          luaStatements.createExpressionStatement(
            transformLuaLibFunction(
              context,
              LuaLibFeature.DescriptorSet,
              parent,
              luaExpressions.createIdentifier("self"),
              context.transformExpression(lhs.expression),
              ts.isPropertyAccessExpression(lhs)
                ? luaExpressions.createStringLiteral(lhs.name.text)
                : context.transformExpression(lhs.argumentExpression),
              right
            )
          ),
        ]
      }
    }
  }

  const symbol =
    lhs.parent && ts.isShorthandPropertyAssignment(lhs.parent)
      ? context.checker.getShorthandAssignmentValueSymbol(lhs.parent)
      : context.checker.getSymbolAtLocation(lhs)

  const dependentSymbols = symbol ? getDependenciesOfSymbol(context, symbol) : []

  const left = transformAssignmentLeftHandSideExpression(context, lhs, rightHasPrecedingStatements)

  const rootAssignment = luaStatements.createAssignmentStatement(left, right, lhs.parent)

  return [
    rootAssignment,
    ...dependentSymbols.map((symbol) => {
      const [left] = rootAssignment.left
      const identifierToAssign = createExportedIdentifier(
        context,
        luaExpressions.createIdentifier(symbol.name)
      )
      return luaStatements.createAssignmentStatement(identifierToAssign, left)
    }),
  ]
}

export function transformAssignmentWithRightPrecedingStatements(
  context: TransformationContext,
  lhs: ts.Expression,
  right: luaExpressions.Expression,
  rightPrecedingStatements: readonly luaStatements.Statement[],
  parent?: ts.Expression
): readonly luaStatements.Statement[] {
  return [
    ...rightPrecedingStatements,
    ...transformAssignment(context, lhs, right, rightPrecedingStatements.length > 0, parent),
  ]
}

function transformDestructuredAssignmentExpression(
  context: TransformationContext,
  expression: ts.DestructuringAssignment
) {
  let { precedingStatements: rightPrecedingStatements, result: right } =
    transformInPrecedingStatementScope(context, () => context.transformExpression(expression.right))
  context.addPrecedingStatements(rightPrecedingStatements)
  if (isMultiReturnCall(context, expression.right)) {
    right = wrapInTable(right)
  }

  const rightExpr = context.moveToPrecedingTemp(right, expression.right)
  const statements = requireTransformDestructuringAssignment()(
    context,
    expression,
    rightExpr,
    rightPrecedingStatements.length > 0
  )

  return { statements, result: rightExpr }
}

export function transformAssignmentExpression(
  context: TransformationContext,
  expression: ts.AssignmentExpression<ts.EqualsToken>
): luaExpressions.Expression {
  const rightType = context.checker.getTypeAtLocation(expression.right)
  const leftType = context.checker.getTypeAtLocation(expression.left)
  validateAssignment(context, expression.right, rightType, leftType)

  if (isArrayLength(context, expression.left)) {
    return transformLuaLibFunction(
      context,
      LuaLibFeature.ArraySetLength,
      expression,
      context.transformExpression(expression.left.expression),
      context.transformExpression(expression.right)
    )
  }

  if (isDestructuringAssignment(expression)) {
    const { statements, result } = transformDestructuredAssignmentExpression(context, expression)
    context.addPrecedingStatements(statements)
    return result
  }

  if (
    ts.isPropertyAccessExpression(expression.left) ||
    ts.isElementAccessExpression(expression.left)
  ) {
    const { precedingStatements, result: right } = transformInPrecedingStatementScope(context, () =>
      context.transformExpression(expression.right)
    )

    const left = transformAssignmentLeftHandSideExpression(
      context,
      expression.left,
      precedingStatements.length > 0
    )

    context.addPrecedingStatements(precedingStatements)
    const rightExpr = context.moveToPrecedingTemp(right, expression.right)
    context.addPrecedingStatements(luaStatements.createAssignmentStatement(left, rightExpr, expression.left))
    return rightExpr
  } else {
    const left = context.transformExpression(expression.left)
    const right = context.transformExpression(expression.right)
    context.addPrecedingStatements(transformAssignment(context, expression.left, right))
    return left
  }
}

const canBeTransformedToLuaAssignmentStatement = (
  context: TransformationContext,
  node: ts.DestructuringAssignment
): node is ts.ArrayDestructuringAssignment =>
  ts.isArrayLiteralExpression(node.left) &&
  node.left.elements.every((element) => {
    if (isArrayLength(context, element)) {
      return false
    }

    if (ts.isPropertyAccessExpression(element) || ts.isElementAccessExpression(element)) {
      return false
    }

    if (ts.isIdentifier(element)) {
      const symbol = context.checker.getSymbolAtLocation(element)
      if (symbol) {
        const aliases = getDependenciesOfSymbol(context, symbol)
        return aliases.length === 0
      }
    }
  })

export function transformAssignmentStatement(
  context: TransformationContext,
  expression: ts.AssignmentExpression<ts.EqualsToken>
): readonly luaStatements.Statement[] {
  const rightType = context.checker.getTypeAtLocation(expression.right)
  const leftType = context.checker.getTypeAtLocation(expression.left)
  validateAssignment(context, expression.right, rightType, leftType)

  if (isDestructuringAssignment(expression)) {
    if (canBeTransformedToLuaAssignmentStatement(context, expression)) {
      const rightType = context.checker.getTypeAtLocation(expression.right)
      let right: luaExpressions.Expression | readonly luaExpressions.Expression[]

      if (ts.isArrayLiteralExpression(expression.right)) {
        right = context.transformExpressionList(expression.right.elements)
      } else {
        right = context.transformExpression(expression.right)
        if (!isMultiReturnCall(context, expression.right) && isArrayType(context, rightType)) {
          right = createBoundedUnpackCall(
            context,
            right,
            expression.left.elements.length,
            expression.right
          )
        }
      }

      const left = expression.left.elements.map((e) =>
        transformAssignmentLeftHandSideExpression(context, e)
      )

      return [luaStatements.createAssignmentStatement(left, right, expression)]
    }

    const { statements } = transformDestructuredAssignmentExpression(context, expression)
    return statements
  } else {
    const { precedingStatements, result: right } = transformInPrecedingStatementScope(context, () =>
      context.transformExpression(expression.right)
    )
    return transformAssignmentWithRightPrecedingStatements(
      context,
      expression.left,
      right,
      precedingStatements
    )
  }
}
