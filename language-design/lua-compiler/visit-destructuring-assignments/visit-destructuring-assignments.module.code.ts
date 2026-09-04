import { assertNever } from "@akasha/utils-narrow/assert-never"
import * as ts from "typescript"
import type { TransformationContext } from "../context-transformation-context/context-transformation-context.module.code.ts"
import * as luaCore from "../tstl-lua-ast-core/tstl-lua-ast-core.module.code.ts"
import * as luaExpressions from "../tstl-lua-ast-expressions/tstl-lua-ast-expressions.module.code.ts"
import * as luaStatements from "../tstl-lua-ast-statements/tstl-lua-ast-statements.module.code.ts"
import { LuaLibFeature } from "../tstl-lua-lib/tstl-lua-lib.module.code.ts"
import { transformLuaLibFunction } from "../tstl-lualib/tstl-lualib.module.code.ts"
import { transformInPrecedingStatementScope } from "../tstl-preceding-statements/tstl-preceding-statements.module.code.ts"
import { isAssignmentPattern } from "../tstl-typescript/tstl-typescript.module.code.ts"
import { cast } from "../tstl-utils/tstl-utils.module.code.ts"
import {
  transformAssignment,
  transformAssignmentLeftHandSideExpression,
  transformAssignmentStatement,
} from "../visit-assignments/visit-assignments.module.code.ts"
import { requireTransformBinaryOperation } from "../visit-binary-operation-deps/visit-binary-operation-deps.module.code.ts"
import { transformDestructuringAssignmentHolder } from "../visit-destructuring-deps/visit-destructuring-deps.module.code.ts"
import { transformPropertyName } from "../visit-property-name/visit-property-name.module.code.ts"

function isEqualsAssignment(
  node: ts.BinaryExpression
): node is ts.AssignmentExpression<ts.EqualsToken> {
  return node.operatorToken.kind === ts.SyntaxKind.EqualsToken
}

export function transformDestructuringAssignment(
  context: TransformationContext,
  node: ts.DestructuringAssignment,
  root: luaExpressions.Expression,
  rightHasPrecedingStatements: boolean
): readonly luaStatements.Statement[] {
  return transformAssignmentPattern(context, node.left, root, rightHasPrecedingStatements)
}

export function transformAssignmentPattern(
  context: TransformationContext,
  node: ts.AssignmentPattern,
  root: luaExpressions.Expression,
  rightHasPrecedingStatements: boolean
): readonly luaStatements.Statement[] {
  switch (node.kind) {
    case ts.SyntaxKind.ObjectLiteralExpression:
      return transformObjectLiteralAssignmentPattern(
        context,
        node,
        root,
        rightHasPrecedingStatements
      )
    case ts.SyntaxKind.ArrayLiteralExpression:
      return transformArrayLiteralAssignmentPattern(
        context,
        node,
        root,
        rightHasPrecedingStatements
      )
  }
}

function transformArrayLiteralAssignmentPattern(
  context: TransformationContext,
  node: ts.ArrayLiteralExpression,
  root: luaExpressions.Expression,
  rightHasPrecedingStatements: boolean
): readonly luaStatements.Statement[] {
  return node.elements.flatMap((element, index) => {
    const indexedRoot = luaExpressions.createTableIndexExpression(
      root,
      luaExpressions.createNumericLiteral(index + 1),
      element
    )

    if (ts.isObjectLiteralExpression(element)) {
      return transformObjectLiteralAssignmentPattern(
        context,
        element,
        indexedRoot,
        rightHasPrecedingStatements
      )
    }
    if (ts.isArrayLiteralExpression(element)) {
      return transformArrayLiteralAssignmentPattern(
        context,
        element,
        indexedRoot,
        rightHasPrecedingStatements
      )
    }
    if (ts.isBinaryExpression(element)) {
      const assignedVariable = context.createTempNameForLuaExpression(indexedRoot)

      const assignedVariableDeclaration = luaStatements.createVariableDeclarationStatement(
        assignedVariable,
        indexedRoot
      )

      const nilCondition = luaExpressions.createBinaryExpression(
        assignedVariable,
        luaExpressions.createNilLiteral(),
        luaCore.SyntaxKind.EqualityOperator
      )

      const {
        precedingStatements: defaultPrecedingStatements,
        result: rawDefaultAssignmentStatements,
      } = transformInPrecedingStatementScope(context, () =>
        transformAssignment(context, element.left, context.transformExpression(element.right))
      )

      const defaultAssignmentStatements: readonly luaStatements.Statement[] = [
        ...defaultPrecedingStatements,
        ...rawDefaultAssignmentStatements,
      ]

      const elseAssignmentStatements = transformAssignment(context, element.left, assignedVariable)

      const ifBlock = luaStatements.createBlock(defaultAssignmentStatements)

      const elseBlock = luaStatements.createBlock(elseAssignmentStatements)

      const ifStatement = luaStatements.createIfStatement(nilCondition, ifBlock, elseBlock, node)

      return [assignedVariableDeclaration, ifStatement]
    }
    if (
      ts.isIdentifier(element) ||
      ts.isPropertyAccessExpression(element) ||
      ts.isElementAccessExpression(element)
    ) {
      const { precedingStatements, result: statements } = transformInPrecedingStatementScope(
        context,
        () => transformAssignment(context, element, indexedRoot, rightHasPrecedingStatements)
      )
      return [...precedingStatements, ...statements]
    }
    if (ts.isSpreadElement(element)) {
      if (index !== node.elements.length - 1) {
        return []
      }

      const restElements = transformLuaLibFunction(
        context,
        LuaLibFeature.ArraySlice,
        undefined,
        root,
        luaExpressions.createNumericLiteral(index)
      )

      const { precedingStatements: spreadPrecedingStatements, result: spreadStatements } =
        transformInPrecedingStatementScope(context, () =>
          transformAssignment(
            context,
            element.expression,
            restElements,
            rightHasPrecedingStatements
          )
        )
      return [...spreadPrecedingStatements, ...spreadStatements]
    }
    return []
  })
}

function transformObjectLiteralAssignmentPattern(
  context: TransformationContext,
  node: ts.ObjectLiteralExpression,
  root: luaExpressions.Expression,
  rightHasPrecedingStatements: boolean
): readonly luaStatements.Statement[] {
  const result: luaStatements.Statement[] = []

  for (const property of node.properties) {
    switch (property.kind) {
      case ts.SyntaxKind.ShorthandPropertyAssignment:
        result.push(...transformShorthandPropertyAssignment(context, property, root))
        break
      case ts.SyntaxKind.PropertyAssignment:
        result.push(
          ...transformPropertyAssignment(context, property, root, rightHasPrecedingStatements)
        )
        break
      case ts.SyntaxKind.SpreadAssignment:
        result.push(...transformSpreadAssignment(context, property, root, node.properties))
        break
      case ts.SyntaxKind.MethodDeclaration:
      case ts.SyntaxKind.GetAccessor:
      case ts.SyntaxKind.SetAccessor:
        break
      default:
        assertNever(property)
    }
  }

  return result
}

function transformShorthandPropertyAssignment(
  context: TransformationContext,
  node: ts.ShorthandPropertyAssignment,
  root: luaExpressions.Expression
): readonly luaStatements.Statement[] {
  const result: luaStatements.Statement[] = []
  const assignmentVariableName = transformAssignmentLeftHandSideExpression(context, node.name)
  const extractionIndex = luaExpressions.createStringLiteral(node.name.text)
  const variableExtractionAssignmentStatements = transformAssignment(
    context,
    node.name,
    luaExpressions.createTableIndexExpression(root, extractionIndex)
  )

  result.push(...variableExtractionAssignmentStatements)

  const defaultInitializer = node.objectAssignmentInitializer
    ? context.transformExpression(node.objectAssignmentInitializer)
    : undefined

  if (defaultInitializer) {
    const nilCondition = luaExpressions.createBinaryExpression(
      assignmentVariableName,
      luaExpressions.createNilLiteral(),
      luaCore.SyntaxKind.EqualityOperator
    )

    const assignmentStatements = transformAssignment(context, node.name, defaultInitializer)

    const ifBlock = luaStatements.createBlock(assignmentStatements)

    result.push(luaStatements.createIfStatement(nilCondition, ifBlock, undefined, node))
  }

  return result
}

function transformPropertyAssignment(
  context: TransformationContext,
  node: ts.PropertyAssignment,
  root: luaExpressions.Expression,
  rightHasPrecedingStatements: boolean
): readonly luaStatements.Statement[] {
  const result: luaStatements.Statement[] = []

  if (isAssignmentPattern(node.initializer)) {
    const propertyAccessString = transformPropertyName(context, node.name)
    const newRootAccess = luaExpressions.createTableIndexExpression(root, propertyAccessString)

    if (ts.isObjectLiteralExpression(node.initializer)) {
      return transformObjectLiteralAssignmentPattern(
        context,
        node.initializer,
        newRootAccess,
        rightHasPrecedingStatements
      )
    }

    if (ts.isArrayLiteralExpression(node.initializer)) {
      return transformArrayLiteralAssignmentPattern(
        context,
        node.initializer,
        newRootAccess,
        rightHasPrecedingStatements
      )
    }
  }

  context.pushPrecedingStatements()

  let variableToExtract = transformPropertyName(context, node.name)
  variableToExtract = context.moveToPrecedingTemp(variableToExtract, node.name)
  const extractingExpression = luaExpressions.createTableIndexExpression(root, variableToExtract)

  let destructureAssignmentStatements: readonly luaStatements.Statement[]
  if (ts.isBinaryExpression(node.initializer)) {
    if (
      ts.isPropertyAccessExpression(node.initializer.left) ||
      ts.isElementAccessExpression(node.initializer.left)
    ) {
      const left = cast(
        context.transformExpression(node.initializer.left),
        luaExpressions.isTableIndexExpression
      )

      const rightExpression = node.initializer.right
      const { precedingStatements: defaultPrecedingStatements, result: defaultExpression } =
        transformInPrecedingStatementScope(context, () =>
          context.transformExpression(rightExpression)
        )

      const tableTemp = context.createTempNameForLuaExpression(left.table)
      const indexTemp = context.createTempNameForLuaExpression(left.index)

      const tempsDeclaration = luaStatements.createVariableDeclarationStatement(
        [tableTemp, indexTemp],
        [left.table, left.index]
      )

      const { precedingStatements: rightPrecedingStatements, result: rhs } =
        requireTransformBinaryOperation()(
          context,
          extractingExpression,
          defaultExpression,
          defaultPrecedingStatements,
          ts.SyntaxKind.QuestionQuestionToken,
          node.initializer
        )
      const assignStatement = luaStatements.createAssignmentStatement(
        luaExpressions.createTableIndexExpression(tableTemp, indexTemp),
        rhs
      )

      destructureAssignmentStatements = [
        tempsDeclaration,
        ...rightPrecedingStatements,
        assignStatement,
      ]
    } else {
      const assignmentLeftHandSide = context.transformExpression(node.initializer.left)

      const nilCondition = luaExpressions.createBinaryExpression(
        assignmentLeftHandSide,
        luaExpressions.createNilLiteral(),
        luaCore.SyntaxKind.EqualityOperator
      )

      const initializer = cast(node.initializer, isEqualsAssignment)
      const ifBlock = luaStatements.createBlock(transformAssignmentStatement(context, initializer))

      destructureAssignmentStatements = [
        luaStatements.createIfStatement(nilCondition, ifBlock, undefined, node),
      ]
    }
  } else {
    destructureAssignmentStatements = transformAssignment(
      context,
      node.initializer,
      extractingExpression,
      rightHasPrecedingStatements
    )
  }

  result.push(...context.popPrecedingStatements())
  result.push(...destructureAssignmentStatements)

  return result
}

function transformSpreadAssignment(
  context: TransformationContext,
  node: ts.SpreadAssignment,
  root: luaExpressions.Expression,
  properties: ts.NodeArray<ts.ObjectLiteralElementLike>
): readonly luaStatements.Statement[] {
  const usedProperties: luaExpressions.TableFieldExpression[] = []
  for (const property of properties) {
    if (
      (ts.isShorthandPropertyAssignment(property) || ts.isPropertyAssignment(property)) &&
      !ts.isComputedPropertyName(property.name) &&
      !ts.isPrivateIdentifier(property.name)
    ) {
      const name = ts.isIdentifier(property.name)
        ? luaExpressions.createStringLiteral(property.name.text)
        : context.transformExpression(property.name)

      usedProperties.push(
        luaExpressions.createTableFieldExpression(luaExpressions.createBooleanLiteral(true), name)
      )
    }
  }

  const extractingExpression = transformLuaLibFunction(
    context,
    LuaLibFeature.ObjectRest,
    undefined,
    root,
    luaExpressions.createTableExpression(usedProperties)
  )

  return transformAssignment(context, node.expression, extractingExpression)
}

transformDestructuringAssignmentHolder.fn = transformDestructuringAssignment
