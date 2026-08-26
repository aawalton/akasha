import * as path from "path"
import * as ts from "typescript"
import * as luaStatements from "../../../LuaAST-statements"
import * as luaExpressions from "../../../LuaAST-expressions"
import { createStaticPromiseFunctionAccessor } from "../../builtins/promise"
import type { TransformationContext } from "../../context/transformation-context"
import type { FunctionVisitor } from "../../context/visitors"
import { AnnotationKind, getSymbolAnnotations } from "../../utils/annotations"
import { createDefaultExportStringLiteral } from "../../utils/export"
import { createHoistableVariableDeclarationStatement } from "../../utils/lua-ast"
import { importLuaLibFeature } from "../../utils/lualib"
import { LuaLibFeature } from "../../../LuaLib"
import { createSafeName } from "../../utils/safe-names"
import { peekScope } from "../../utils/scope"
import { getCustomNameFromSymbol, transformIdentifier } from "../identifier"
import { transformPropertyName } from "../property-name"

function isNoResolutionPath(
  context: TransformationContext,
  moduleSpecifier: ts.Expression
): boolean {
  const moduleOwnerSymbol = context.checker.getSymbolAtLocation(moduleSpecifier)
  if (!moduleOwnerSymbol) return false

  const annotations = getSymbolAnnotations(moduleOwnerSymbol)
  return annotations.has(AnnotationKind.NoResolution)
}

export function createModuleRequire(
  context: TransformationContext,
  moduleSpecifier: ts.Expression,
  tsOriginal: ts.Node = moduleSpecifier
): luaExpressions.CallExpression {
  const params: luaExpressions.Expression[] = []
  if (ts.isStringLiteral(moduleSpecifier)) {
    const modulePath = isNoResolutionPath(context, moduleSpecifier)
      ? `@NoResolution:${moduleSpecifier.text}`
      : moduleSpecifier.text

    params.push(luaExpressions.createStringLiteral(modulePath))
  }

  return luaExpressions.createCallExpression(luaExpressions.createIdentifier("require"), params, tsOriginal)
}

function shouldBeImported(
  context: TransformationContext,
  importNode: ts.ImportClause | ts.ImportSpecifier
): boolean {
  return context.resolver.isReferencedAliasDeclaration(importNode)
}

function transformImportSpecifier(
  context: TransformationContext,
  importSpecifier: ts.ImportSpecifier,
  moduleTableName: luaExpressions.Identifier
): luaStatements.VariableDeclarationStatement {
  const type = context.checker.getTypeAtLocation(importSpecifier.name)

  const leftIdentifier = transformIdentifier(context, importSpecifier.name)

  const customName = getCustomNameFromSymbol(context, type.getSymbol())
  const propertyName = customName != null
    ? luaExpressions.createStringLiteral(customName, importSpecifier.propertyName ?? importSpecifier.name)
    : transformPropertyName(context, importSpecifier.propertyName ?? importSpecifier.name)

  return luaStatements.createVariableDeclarationStatement(
    leftIdentifier,
    luaExpressions.createTableIndexExpression(moduleTableName, propertyName),
    importSpecifier
  )
}

export const transformImportDeclaration: FunctionVisitor<ts.ImportDeclaration> = (
  statement,
  context
) => {
  const scope = peekScope(context)

  scope.importStatements ??= []

  const result: luaStatements.Statement[] = []
  const requireCall = createModuleRequire(context, statement.moduleSpecifier)

  if (statement.importClause === undefined) {
    result.push(luaStatements.createExpressionStatement(requireCall))

    scope.importStatements = [...(scope.importStatements ?? []), ...result]
    return undefined
  }

  const importPath = ts.isStringLiteral(statement.moduleSpecifier)
    ? statement.moduleSpecifier.text.replace(/"/g, "")
    : "module"

  const importUniqueName = luaExpressions.createIdentifier(createSafeName(path.basename(importPath)))

  let usingRequireStatement = false

  if (statement.importClause.name) {
    if (shouldBeImported(context, statement.importClause)) {
      const propertyName = createDefaultExportStringLiteral(statement.importClause.name)
      const defaultImportAssignmentStatement = luaStatements.createVariableDeclarationStatement(
        transformIdentifier(context, statement.importClause.name),
        luaExpressions.createTableIndexExpression(importUniqueName, propertyName),
        statement.importClause.name
      )

      result.push(defaultImportAssignmentStatement)
      usingRequireStatement = true
    }
  }

  if (
    statement.importClause.namedBindings &&
    ts.isNamespaceImport(statement.importClause.namedBindings)
  ) {
    if (context.resolver.isReferencedAliasDeclaration(statement.importClause.namedBindings)) {
      const requireStatement = luaStatements.createVariableDeclarationStatement(
        transformIdentifier(context, statement.importClause.namedBindings.name),
        requireCall,
        statement
      )

      result.push(requireStatement)
    }
  }

  if (
    statement.importClause.namedBindings &&
    ts.isNamedImports(statement.importClause.namedBindings)
  ) {
    const assignmentStatements = statement.importClause.namedBindings.elements
      .filter((importSpecifier) => shouldBeImported(context, importSpecifier))
      .map((importSpecifier) =>
        transformImportSpecifier(context, importSpecifier, importUniqueName)
      )

    if (assignmentStatements.length > 0) {
      usingRequireStatement = true
    }

    result.push(...assignmentStatements)
  }

  if (result.length === 0) {
    return undefined
  }

  if (usingRequireStatement) {
    result.unshift(luaStatements.createVariableDeclarationStatement(importUniqueName, requireCall, statement))
  }

  scope.importStatements = [...(scope.importStatements ?? []), ...result]
  return undefined
}

export const transformExternalModuleReference: FunctionVisitor<ts.ExternalModuleReference> = (
  node,
  context
) => createModuleRequire(context, node.expression, node)

export const transformImportEqualsDeclaration: FunctionVisitor<ts.ImportEqualsDeclaration> = (
  node,
  context
) => {
  if (
    !context.resolver.isReferencedAliasDeclaration(node) &&
    (ts.isExternalModuleReference(node.moduleReference) ||
      ts.isExternalModule(context.sourceFile) ||
      !context.resolver.isTopLevelValueImportEqualsWithEntityName(node))
  ) {
    return undefined
  }

  const name = transformIdentifier(context, node.name)
  const expression = context.transformExpression(node.moduleReference)
  return createHoistableVariableDeclarationStatement(context, name, expression, node)
}

export const transformImportExpression: FunctionVisitor<ts.CallExpression> = (node, context) => {
  importLuaLibFeature(context, LuaLibFeature.Promise)

  const firstArg = node.arguments[0]
  const moduleRequire =
    firstArg !== undefined
      ? createModuleRequire(context, firstArg, node)
      : luaExpressions.createNilLiteral()
  return luaExpressions.createCallExpression(
    createStaticPromiseFunctionAccessor("resolve", node),
    [moduleRequire],
    node
  )
}
