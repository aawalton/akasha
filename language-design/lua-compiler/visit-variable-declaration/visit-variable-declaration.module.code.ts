import { assertNever } from "@akasha/utils-narrow/assert-never"
import * as ts from "typescript"
import type { TransformationContext } from "../context-transformation-context/context-transformation-context.module.code.ts"
import type { FunctionVisitor } from "../context-visitors/context-visitors.module.code.ts"
import { validateAssignment } from "../tstl-assignment-validation/tstl-assignment-validation.module.code.ts"
import { unsupportedVarDeclaration } from "../tstl-diagnostics/tstl-diagnostics.module.code.ts"
import { addExportToIdentifier } from "../tstl-export/tstl-export.module.code.ts"
import {
  createBoundedUnpackCall,
  createLocalOrExportedOrGlobalDeclaration,
  wrapInTable,
} from "../tstl-lua-ast/tstl-lua-ast.module.code.ts"
import * as luaCore from "../tstl-lua-ast-core/tstl-lua-ast-core.module.code.ts"
import * as luaExpressions from "../tstl-lua-ast-expressions/tstl-lua-ast-expressions.module.code.ts"
import * as luaStatements from "../tstl-lua-ast-statements/tstl-lua-ast-statements.module.code.ts"
import { LuaLibFeature } from "../tstl-lua-lib/tstl-lua-lib.module.code.ts"
import { transformLuaLibFunction } from "../tstl-lualib/tstl-lualib.module.code.ts"
import { transformInPrecedingStatementScope } from "../tstl-preceding-statements/tstl-preceding-statements.module.code.ts"
import { assert, cast } from "../tstl-utils/tstl-utils.module.code.ts"
import { isMultiReturnCall } from "../visit-extension-multi/visit-extension-multi.module.code.ts"
import {
  createCallableTable,
  isFunctionTypeWithProperties,
} from "../visit-function-shape/visit-function-shape.module.code.ts"
import { transformIdentifier } from "../visit-identifier/visit-identifier.module.code.ts"
import { transformPropertyName } from "../visit-property-name/visit-property-name.module.code.ts"

export function transformArrayBindingElement(
  context: TransformationContext,
  name: ts.ArrayBindingElement
): luaExpressions.Identifier {
  if (ts.isOmittedExpression(name)) {
    return luaExpressions.createAnonymousIdentifier(name)
  } else if (ts.isIdentifier(name)) {
    return transformIdentifier(context, name)
  } else if (ts.isBindingElement(name)) {
    if (ts.isIdentifier(name.name)) {
      return transformIdentifier(context, name.name)
    } else {
      const tempName = context.createTempNameForNode(name.name)
      context.addPrecedingStatements(transformBindingPattern(context, name.name, tempName))
      return tempName
    }
  } else {
    assertNever(name)
  }
}

export function transformBindingPattern(
  context: TransformationContext,
  pattern: ts.BindingPattern,
  table: luaExpressions.Expression,
  parentPropertyAccessStack: readonly ts.PropertyName[] = []
): readonly luaStatements.Statement[] {
  const result: luaStatements.Statement[] = []
  const propertyAccessStack: ts.PropertyName[] = [...parentPropertyAccessStack]

  for (const [index, element] of pattern.elements.entries()) {
    if (ts.isOmittedExpression(element)) continue

    if (ts.isArrayBindingPattern(element.name) || ts.isObjectBindingPattern(element.name)) {
      const propertyName = ts.isObjectBindingPattern(pattern)
        ? element.propertyName
        : ts.factory.createNumericLiteral(String(index + 1))

      if (propertyName !== undefined) {
        propertyAccessStack.push(propertyName)
      }

      result.push(...transformBindingPattern(context, element.name, table, propertyAccessStack))
      continue
    }

    const tableExpression = propertyAccessStack.reduce<luaExpressions.Expression>(
      (path, property) =>
        luaExpressions.createTableIndexExpression(path, transformPropertyName(context, property)),
      table
    )

    const variableName = transformIdentifier(context, element.name)
    const elementName = element.propertyName ?? element.name
    const { precedingStatements, result: propertyName } = transformInPrecedingStatementScope(
      context,
      () => transformPropertyName(context, elementName)
    )
    result.push(...precedingStatements)

    let expression: luaExpressions.Expression
    if (element.dotDotDotToken) {
      if (index !== pattern.elements.length - 1) {
        continue
      }

      if (ts.isObjectBindingPattern(pattern)) {
        const excludedProperties: ts.Identifier[] = []

        for (const element of pattern.elements) {
          if (element.dotDotDotToken) continue

          if (ts.isIdentifier(element.name) && !element.propertyName) {
            excludedProperties.push(element.name)
          }

          if (element.propertyName && element.name && ts.isIdentifier(element.propertyName)) {
            excludedProperties.push(element.propertyName)
          }
        }

        const excludedPropertiesTable = excludedProperties.map((e) =>
          luaExpressions.createTableFieldExpression(
            luaExpressions.createBooleanLiteral(true),
            luaExpressions.createStringLiteral(e.text, e)
          )
        )

        expression = transformLuaLibFunction(
          context,
          LuaLibFeature.ObjectRest,
          undefined,
          tableExpression,
          luaExpressions.createTableExpression(excludedPropertiesTable)
        )
      } else {
        expression = transformLuaLibFunction(
          context,
          LuaLibFeature.ArraySlice,
          undefined,
          tableExpression,
          luaExpressions.createNumericLiteral(index)
        )
      }
    } else {
      expression = luaExpressions.createTableIndexExpression(
        tableExpression,
        ts.isObjectBindingPattern(pattern)
          ? propertyName
          : luaExpressions.createNumericLiteral(index + 1)
      )
    }

    result.push(...createLocalOrExportedOrGlobalDeclaration(context, variableName, expression))
    if (element.initializer) {
      const identifier = addExportToIdentifier(context, variableName)
      const tsInitializer = element.initializer
      const { precedingStatements: initializerPrecedingStatements, result: initializer } =
        transformInPrecedingStatementScope(context, () =>
          context.transformExpression(tsInitializer)
        )
      result.push(
        luaStatements.createIfStatement(
          luaExpressions.createBinaryExpression(
            identifier,
            luaExpressions.createNilLiteral(),
            luaCore.SyntaxKind.EqualityOperator
          ),
          luaStatements.createBlock([
            ...initializerPrecedingStatements,
            luaStatements.createAssignmentStatement(identifier, initializer),
          ])
        )
      )
    }
  }

  propertyAccessStack.pop()
  return result
}

export function transformBindingVariableDeclaration(
  context: TransformationContext,
  bindingPattern: ts.BindingPattern,
  initializer?: ts.Expression
): readonly luaStatements.Statement[] {
  const statements: luaStatements.Statement[] = []

  const isComplexBindingElement = (e: ts.ArrayBindingElement) =>
    ts.isBindingElement(e) && (!ts.isIdentifier(e.name) || e.dotDotDotToken)

  if (
    ts.isObjectBindingPattern(bindingPattern) ||
    bindingPattern.elements.some(isComplexBindingElement)
  ) {
    let table: luaExpressions.Expression
    if (initializer) {
      let expression = context.transformExpression(initializer)
      if (isMultiReturnCall(context, initializer)) {
        expression = wrapInTable(expression)
      }
      const { precedingStatements: moveStatements, result: movedExpr } =
        transformInPrecedingStatementScope(context, () =>
          context.moveToPrecedingTemp(expression, initializer)
        )
      statements.push(...moveStatements)
      table = movedExpr
    } else {
      table = luaExpressions.createAnonymousIdentifier()
    }
    statements.push(...transformBindingPattern(context, bindingPattern, table))
    return statements
  }

  const vars =
    bindingPattern.elements.length > 0
      ? bindingPattern.elements.map((e) => transformArrayBindingElement(context, e))
      : luaExpressions.createAnonymousIdentifier()

  if (initializer) {
    if (isMultiReturnCall(context, initializer)) {
      statements.push(
        ...createLocalOrExportedOrGlobalDeclaration(
          context,
          vars,
          context.transformExpression(initializer),
          initializer
        )
      )
    } else if (ts.isArrayLiteralExpression(initializer)) {
      const values =
        initializer.elements.length > 0
          ? initializer.elements.map((e) => context.transformExpression(e))
          : luaExpressions.createNilLiteral()
      statements.push(
        ...createLocalOrExportedOrGlobalDeclaration(context, vars, values, initializer)
      )
    } else {
      const unpackedInitializer = createBoundedUnpackCall(
        context,
        context.transformExpression(initializer),
        bindingPattern.elements.length,
        initializer
      )
      statements.push(
        ...createLocalOrExportedOrGlobalDeclaration(context, vars, unpackedInitializer, initializer)
      )
    }
  } else {
    statements.push(
      ...createLocalOrExportedOrGlobalDeclaration(
        context,
        vars,
        luaExpressions.createNilLiteral(),
        initializer
      )
    )
  }

  for (const element of bindingPattern.elements) {
    if (!ts.isOmittedExpression(element) && element.initializer) {
      const variableName = transformIdentifier(context, cast(element.name, ts.isIdentifier))
      const identifier = addExportToIdentifier(context, variableName)
      statements.push(
        luaStatements.createIfStatement(
          luaExpressions.createBinaryExpression(
            identifier,
            luaExpressions.createNilLiteral(),
            luaCore.SyntaxKind.EqualityOperator
          ),
          luaStatements.createBlock([
            luaStatements.createAssignmentStatement(
              identifier,
              context.transformExpression(element.initializer)
            ),
          ])
        )
      )
    }
  }

  return statements
}

export function transformVariableDeclaration(
  context: TransformationContext,
  statement: ts.VariableDeclaration
): readonly luaStatements.Statement[] {
  if (statement.initializer && statement.type) {
    const initializerType = context.checker.getTypeAtLocation(statement.initializer)
    const varType = context.checker.getTypeFromTypeNode(statement.type)
    validateAssignment(context, statement.initializer, initializerType, varType)
  }

  if (ts.isIdentifier(statement.name)) {
    const identifierName = transformIdentifier(context, statement.name)
    const value = statement.initializer && context.transformExpression(statement.initializer)

    const wrappedValue =
      value && shouldWrapInitializerInCallableTable() ? createCallableTable(value) : value

    return createLocalOrExportedOrGlobalDeclaration(
      context,
      identifierName,
      wrappedValue,
      statement
    )
  } else if (
    ts.isArrayBindingPattern(statement.name) ||
    ts.isObjectBindingPattern(statement.name)
  ) {
    return transformBindingVariableDeclaration(context, statement.name, statement.initializer)
  } else {
    return assertNever(statement.name)
  }

  function shouldWrapInitializerInCallableTable() {
    assert(statement.initializer)
    const initializer = ts.skipOuterExpressions(statement.initializer)
    if (!ts.isFunctionExpression(initializer) && !ts.isArrowFunction(initializer)) return false
    if (ts.isFunctionExpression(initializer) && initializer.name) return false
    return isFunctionTypeWithProperties(context, context.checker.getTypeAtLocation(statement.name))
  }
}

export function checkVariableDeclarationList(
  context: TransformationContext,
  node: ts.VariableDeclarationList
): undefined {
  if (
    (node.flags &
      (ts.NodeFlags.Let | ts.NodeFlags.Const | ts.NodeFlags.Using | ts.NodeFlags.AwaitUsing)) ===
    0
  ) {
    const token = ts.getOriginalNode(node).getFirstToken()
    assert(token)
    context.addDiagnostic(unsupportedVarDeclaration(token))
  }
}

export const transformVariableStatement: FunctionVisitor<ts.VariableStatement> = (
  node,
  context
) => {
  checkVariableDeclarationList(context, node.declarationList)
  return node.declarationList.declarations.flatMap((declaration) =>
    transformVariableDeclaration(context, declaration)
  )
}
