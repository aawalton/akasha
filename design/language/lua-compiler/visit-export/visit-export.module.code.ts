import * as path from "node:path"
import {
  createDefaultExportExpression,
  createDefaultExportStringLiteral,
} from "akasha/design/language/lua-compiler/export-scope/export-scope.module.code.ts"
import { createExportsIdentifier } from "akasha/design/language/lua-compiler/exports-identifier/exports-identifier.module.code.ts"
import * as luaCore from "akasha/design/language/lua-compiler/lua-ast-core/lua-ast-core.module.code.ts"
import * as luaExpressions from "akasha/design/language/lua-compiler/lua-ast-expressions/lua-ast-expressions.module.code.ts"
import * as luaStatements from "akasha/design/language/lua-compiler/lua-ast-statements/lua-ast-statements.module.code.ts"
import type { TransformationContext } from "akasha/design/language/lua-compiler/modules/context-transformation-context/context-transformation-context.module.code.ts"
import type { FunctionVisitor } from "akasha/design/language/lua-compiler/modules/context-visitors/context-visitors.module.code.ts"
import { createSafeName } from "akasha/design/language/lua-compiler/safe-names/safe-names.module.code.ts"
import { assert } from "akasha/design/language/lua-compiler/utils/utils.module.code.ts"
import { createModuleRequire } from "akasha/design/language/lua-compiler/visit-import/visit-import.module.code.ts"
import { createShorthandIdentifier } from "akasha/design/language/lua-compiler/visit-literal/visit-literal.module.code.ts"
import { transformPropertyName } from "akasha/design/language/lua-compiler/visit-property-name/visit-property-name.module.code.ts"
import * as ts from "typescript"

export const transformExportAssignment: FunctionVisitor<ts.ExportAssignment> = (node, context) => {
  if (!context.resolver.isValueAliasDeclaration(node)) {
    return undefined
  }

  const exportedValue = context.transformExpression(node.expression)

  if (node.isExportEquals) {
    return luaStatements.createVariableDeclarationStatement(
      createExportsIdentifier(),
      exportedValue,
      node
    )
  } else {
    return luaStatements.createAssignmentStatement(
      luaExpressions.createTableIndexExpression(
        createExportsIdentifier(),
        createDefaultExportStringLiteral(node)
      ),
      exportedValue,
      node
    )
  }
}

function transformExportAll(
  context: TransformationContext,
  node: ts.ExportDeclaration
): luaStatements.Statement | undefined {
  assert(node.moduleSpecifier)

  const moduleRequire = createModuleRequire(context, node.moduleSpecifier)

  if (node.exportClause && ts.isNamespaceExport(node.exportClause)) {
    const assignToExports = luaStatements.createAssignmentStatement(
      luaExpressions.createTableIndexExpression(
        createExportsIdentifier(),
        luaExpressions.createStringLiteral(node.exportClause.name.text)
      ),
      moduleRequire
    )
    return assignToExports
  }

  const result: luaStatements.Statement[] = []

  const tempModuleIdentifier = luaExpressions.createIdentifier("____export")
  const declaration = luaStatements.createVariableDeclarationStatement(
    tempModuleIdentifier,
    moduleRequire
  )
  result.push(declaration)

  const forKey = luaExpressions.createIdentifier("____exportKey")
  const forValue = luaExpressions.createIdentifier("____exportValue")
  const leftAssignment = luaStatements.createAssignmentStatement(
    luaExpressions.createTableIndexExpression(createExportsIdentifier(), forKey),
    forValue
  )

  const ifBody = luaStatements.createBlock([leftAssignment])
  const ifStatement = luaStatements.createIfStatement(
    luaExpressions.createBinaryExpression(
      luaExpressions.cloneIdentifier(forKey),
      luaExpressions.createStringLiteral("default"),
      luaCore.SyntaxKind.InequalityOperator
    ),
    ifBody
  )

  const pairsIdentifier = luaExpressions.createIdentifier("pairs")
  const forIn = luaStatements.createForInStatement(
    luaStatements.createBlock([ifStatement]),
    [luaExpressions.cloneIdentifier(forKey), luaExpressions.cloneIdentifier(forValue)],
    [
      luaExpressions.createCallExpression(pairsIdentifier, [
        luaExpressions.cloneIdentifier(tempModuleIdentifier),
      ]),
    ]
  )

  result.push(forIn)

  return luaStatements.createDoStatement(result, node)
}

const isDefaultExportSpecifier = (node: ts.ExportSpecifier) =>
  (node.name &&
    ts.isIdentifier(node.name) &&
    ts.identifierToKeywordKind(node.name) === ts.SyntaxKind.DefaultKeyword) ||
  (node.propertyName &&
    ts.isIdentifier(node.propertyName) &&
    ts.identifierToKeywordKind(node.propertyName) === ts.SyntaxKind.DefaultKeyword)

function transformExportSpecifier(
  context: TransformationContext,
  node: ts.ExportSpecifier
): luaStatements.AssignmentStatement {
  const exportedName = node.name
  const exportedValue = node.propertyName ?? node.name
  let rhs: luaExpressions.Expression
  if (ts.isIdentifier(exportedValue)) {
    const exportedSymbol = context.checker.getExportSpecifierLocalTargetSymbol(node)
    rhs = createShorthandIdentifier(context, exportedSymbol, exportedValue)
  } else {
    rhs = luaExpressions.createStringLiteral(exportedName.text, exportedValue)
  }

  if (isDefaultExportSpecifier(node)) {
    const lhs = createDefaultExportExpression(node)
    return luaStatements.createAssignmentStatement(lhs, rhs, node)
  } else {
    const exportsTable = createExportsIdentifier()
    const lhs = luaExpressions.createTableIndexExpression(
      exportsTable,
      luaExpressions.createStringLiteral(exportedName.text),
      exportedName
    )

    return luaStatements.createAssignmentStatement(lhs, rhs, node)
  }
}

function transformExportSpecifiersFrom(
  context: TransformationContext,
  statement: ts.ExportDeclaration,
  moduleSpecifier: ts.Expression,
  exportSpecifiers: readonly ts.ExportSpecifier[]
): luaStatements.Statement {
  const result: luaStatements.Statement[] = []

  const importPath = ts.isStringLiteral(moduleSpecifier)
    ? moduleSpecifier.text.replace(/"/g, "")
    : "module"

  const importUniqueName = luaExpressions.createIdentifier(
    createSafeName(path.basename(importPath))
  )
  const requireCall = createModuleRequire(context, moduleSpecifier)
  result.push(
    luaStatements.createVariableDeclarationStatement(importUniqueName, requireCall, statement)
  )

  for (const specifier of exportSpecifiers) {
    const exportsTable = createExportsIdentifier()
    const exportedName = specifier.name
    const exportedNameTransformed = transformPropertyName(context, exportedName)
    const lhs = luaExpressions.createTableIndexExpression(
      exportsTable,
      exportedNameTransformed,
      exportedName
    )

    const exportedValue = specifier.propertyName ?? specifier.name
    const rhs = luaExpressions.createTableIndexExpression(
      luaExpressions.cloneIdentifier(importUniqueName),
      transformPropertyName(context, exportedValue),
      specifier
    )
    result.push(luaStatements.createAssignmentStatement(lhs, rhs, specifier))
  }

  return luaStatements.createDoStatement(result, statement)
}

const getExported = (context: TransformationContext, exportSpecifiers: ts.NamedExports) =>
  exportSpecifiers.elements.filter((exportSpecifier) =>
    context.resolver.isValueAliasDeclaration(exportSpecifier)
  )

export const transformExportDeclaration: FunctionVisitor<ts.ExportDeclaration> = (
  node,
  context
) => {
  if (!node.exportClause) {
    return transformExportAll(context, node)
  }

  if (!context.resolver.isValueAliasDeclaration(node)) {
    return undefined
  }

  if (ts.isNamespaceExport(node.exportClause)) {
    return transformExportAll(context, node)
  }

  const exportSpecifiers = getExported(context, node.exportClause)

  if (!node.moduleSpecifier) {
    return exportSpecifiers.map((exportSpecifier) =>
      transformExportSpecifier(context, exportSpecifier)
    )
  }

  return transformExportSpecifiersFrom(context, node, node.moduleSpecifier, exportSpecifiers)
}
