import * as path from "path"
import * as ts from "typescript"
import type { TransformationContext } from "../context-transformation-context/context-transformation-context.module.code.ts"
import type { FunctionVisitor } from "../context-visitors/context-visitors.module.code.ts"
import {
  AnnotationKind,
  getSymbolAnnotations,
} from "../tstl-annotations/tstl-annotations.module.code.ts"
import { createDefaultExportStringLiteral } from "../tstl-export/tstl-export.module.code.ts"
import { createHoistableVariableDeclarationStatement } from "../tstl-lua-ast/tstl-lua-ast.module.code.ts"
import * as luaExpressions from "../tstl-lua-ast-expressions/tstl-lua-ast-expressions.module.code.ts"
import * as luaStatements from "../tstl-lua-ast-statements/tstl-lua-ast-statements.module.code.ts"
import { LuaLibFeature } from "../tstl-lua-lib/tstl-lua-lib.module.code.ts"
import {
  createStaticPromiseFunctionAccessor,
  importLuaLibFeature,
} from "../tstl-lualib/tstl-lualib.module.code.ts"
import { createSafeName } from "../tstl-safe-names/tstl-safe-names.module.code.ts"
import { peekScope } from "../tstl-scope/tstl-scope.module.code.ts"
import {
  getCustomNameFromSymbol,
  transformIdentifier,
} from "../visit-identifier/visit-identifier.module.code.ts"
import { transformPropertyName } from "../visit-property-name/visit-property-name.module.code.ts"

function isNoResolutionPath(
  context: TransformationContext,
  moduleSpecifier: ts.Expression
): boolean {
  const moduleOwnerSymbol = context.checker.getSymbolAtLocation(moduleSpecifier)
  if (!moduleOwnerSymbol) return false

  const annotations = getSymbolAnnotations(moduleOwnerSymbol)
  return annotations.has(AnnotationKind.NoResolution)
}

type ResolvingProgram = ts.Program & {
  getResolvedModule?: (
    containing: ts.SourceFile,
    moduleName: string,
    mode: ts.ResolutionMode
  ) => { resolvedModule?: { resolvedFileName: string } } | undefined
}

function resolvedFileFor(
  context: TransformationContext,
  moduleSpecifier: ts.Expression
): ts.SourceFile | undefined {
  const symbol = context.checker.getSymbolAtLocation(moduleSpecifier)
  const declared = symbol?.declarations?.find((one): one is ts.SourceFile => ts.isSourceFile(one))
  if (declared !== undefined) return declared
  if (!ts.isStringLiteral(moduleSpecifier)) return undefined
  const program = context.program as ResolvingProgram
  if (program.getResolvedModule === undefined) return undefined
  const containing = moduleSpecifier.getSourceFile()
  const mode = ts.getModeForUsageLocation(containing, moduleSpecifier, program.getCompilerOptions())
  const found = program.getResolvedModule(containing, moduleSpecifier.text, mode)
  const name = found?.resolvedModule?.resolvedFileName
  return name === undefined ? undefined : program.getSourceFile(name)
}

function isDeclarationOnlyModule(
  context: TransformationContext,
  moduleSpecifier: ts.Expression
): boolean {
  if (isNoResolutionPath(context, moduleSpecifier)) return false
  const found = resolvedFileFor(context, moduleSpecifier)
  return found !== undefined && found.isDeclarationFile
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

  return luaExpressions.createCallExpression(
    luaExpressions.createIdentifier("require"),
    params,
    tsOriginal
  )
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
  const propertyName =
    customName != null
      ? luaExpressions.createStringLiteral(
          customName,
          importSpecifier.propertyName ?? importSpecifier.name
        )
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

  if (isDeclarationOnlyModule(context, statement.moduleSpecifier)) return undefined

  const requireCall = createModuleRequire(context, statement.moduleSpecifier)

  if (statement.importClause === undefined) {
    result.push(luaStatements.createExpressionStatement(requireCall))

    scope.importStatements = [...(scope.importStatements ?? []), ...result]
    return undefined
  }

  const importPath = ts.isStringLiteral(statement.moduleSpecifier)
    ? statement.moduleSpecifier.text.replace(/"/g, "")
    : "module"

  const importUniqueName = luaExpressions.createIdentifier(
    createSafeName(path.basename(importPath))
  )

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
    result.unshift(
      luaStatements.createVariableDeclarationStatement(importUniqueName, requireCall, statement)
    )
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
