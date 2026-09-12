import type { FunctionVisitor } from "akasha/design/language/lua-compiler/context-visitors/context-visitors.module.code.ts"
import { addExportToIdentifier } from "akasha/design/language/lua-compiler/export-scope/export-scope.module.code.ts"
import {
  createBoundedUnpackCall,
  createLocalOrExportedOrGlobalDeclaration,
  wrapInTable,
} from "akasha/design/language/lua-compiler/lua-ast/lua-ast.module.code.ts"
import * as luaCore from "akasha/design/language/lua-compiler/lua-ast-core/lua-ast-core.module.code.ts"
import * as luaExpressions from "akasha/design/language/lua-compiler/lua-ast-expressions/lua-ast-expressions.module.code.ts"
import * as luaStatements from "akasha/design/language/lua-compiler/lua-ast-statements/lua-ast-statements.module.code.ts"
import { transformLuaLibFunction } from "akasha/design/language/lua-compiler/lualib-call/lualib-call.module.code.ts"
import { LuaLibFeature } from "akasha/design/language/lua-compiler/lualib-features/lualib-features.module.code.ts"
import { validateAssignment } from "akasha/design/language/lua-compiler/modules/assignment-validation/assignment-validation.module.code.ts"
import type { TransformationContext } from "akasha/design/language/lua-compiler/modules/context-transformation-context/context-transformation-context.module.code.ts"
import { transformInPrecedingStatementScope } from "akasha/design/language/lua-compiler/preceding-statements/preceding-statements.module.code.ts"
import { unsupportedVarDeclaration } from "akasha/design/language/lua-compiler/transform-diagnostics/transform-diagnostics.module.code.ts"
import { assert, cast } from "akasha/design/language/lua-compiler/utils/utils.module.code.ts"
import { isMultiReturnCall } from "akasha/design/language/lua-compiler/visit-extension-multi/visit-extension-multi.module.code.ts"
import {
  createCallableTable,
  isFunctionTypeWithProperties,
} from "akasha/design/language/lua-compiler/visit-function-shape/visit-function-shape.module.code.ts"
import { transformIdentifier } from "akasha/design/language/lua-compiler/visit-identifier/visit-identifier.module.code.ts"
import { transformPropertyName } from "akasha/design/language/lua-compiler/visit-property-name/visit-property-name.module.code.ts"
import { assertNever } from "akasha/utils/narrow/modules/assert-never/assert-never.module.code.ts"
import * as ts from "typescript"

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

        for (const sibling of pattern.elements) {
          if (sibling.dotDotDotToken) continue

          if (ts.isIdentifier(sibling.name) && !sibling.propertyName) {
            excludedProperties.push(sibling.name)
          }

          if (sibling.propertyName && sibling.name && ts.isIdentifier(sibling.propertyName)) {
            excludedProperties.push(sibling.propertyName)
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

function transformBindingVariableDeclaration(
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
