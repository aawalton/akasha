import * as ts from "typescript"
import type { TransformationContext } from "../context-transformation-context/context-transformation-context.module.code.ts"
import type { FunctionVisitor } from "../context-visitors/context-visitors.module.code.ts"
import {
  addExportToIdentifier,
  createExportedIdentifier,
  getIdentifierExportScope,
} from "../tstl-export/tstl-export.module.code.ts"
import { moduleLocalNameHolder } from "../tstl-export-deps/tstl-export-deps.module.code.ts"
import {
  createHoistableVariableDeclarationStatement,
  createLocalOrExportedOrGlobalDeclaration,
} from "../tstl-lua-ast/tstl-lua-ast.module.code.ts"
import * as luaCore from "../tstl-lua-ast-core/tstl-lua-ast-core.module.code.ts"
import * as luaExpressions from "../tstl-lua-ast-expressions/tstl-lua-ast-expressions.module.code.ts"
import * as luaStatements from "../tstl-lua-ast-statements/tstl-lua-ast-statements.module.code.ts"
import { createSafeName, isUnsafeName } from "../tstl-safe-names/tstl-safe-names.module.code.ts"
import { performHoisting, ScopeType } from "../tstl-scope/tstl-scope.module.code.ts"
import { getSymbolIdOfSymbol } from "../tstl-symbols/tstl-symbols.module.code.ts"
import { transformIdentifier } from "../visit-identifier/visit-identifier.module.code.ts"

export function createModuleLocalName(
  context: TransformationContext,
  module: ts.ModuleDeclaration
): luaExpressions.Expression {
  if (!ts.isSourceFile(module.parent) && ts.isModuleDeclaration(module.parent)) {
    const parentDeclaration = createModuleLocalName(context, module.parent)
    const name = createModuleLocalNameIdentifier(context, module)
    return luaExpressions.createTableIndexExpression(
      parentDeclaration,
      luaExpressions.createStringLiteral(name.text),
      module.name
    )
  }

  return createModuleLocalNameIdentifier(context, module)
}

moduleLocalNameHolder.fn = createModuleLocalName

export function createModuleLocalNameIdentifier(
  context: TransformationContext,
  declaration: ts.ModuleDeclaration
): luaExpressions.Identifier {
  const moduleSymbol = context.checker.getSymbolAtLocation(declaration.name)
  if (moduleSymbol !== undefined && isUnsafeName(moduleSymbol.name, context.options)) {
    return luaExpressions.createIdentifier(
      createSafeName(declaration.name.text),
      declaration.name,
      moduleSymbol && getSymbolIdOfSymbol(context, moduleSymbol),
      declaration.name.text
    )
  }

  if (!ts.isIdentifier(declaration.name)) {
    throw new Error(
      `createModuleLocalNameIdentifier: expected module name to be an identifier, got ${ts.SyntaxKind[declaration.name.kind]}`
    )
  }
  return transformIdentifier(context, declaration.name)
}

function moduleHasEmittedBody(
  node: ts.ModuleDeclaration
): node is ts.ModuleDeclaration & { body: ts.ModuleBlock | ts.ModuleDeclaration } {
  if (node.body) {
    if (ts.isModuleBlock(node.body)) {
      return node.body.statements.some(
        (s) => !ts.isInterfaceDeclaration(s) && !ts.isTypeAliasDeclaration(s)
      )
    } else if (ts.isModuleDeclaration(node.body)) {
      return true
    }
  }

  return false
}

export const transformModuleDeclaration: FunctionVisitor<ts.ModuleDeclaration> = (
  node,
  context
) => {
  const currentNamespace = context.currentNamespaces
  const result: luaStatements.Statement[] = []

  const symbol = context.checker.getSymbolAtLocation(node.name)
  const hasExports = symbol !== undefined && context.checker.getExportsOfModule(symbol).length > 0
  if (!ts.isIdentifier(node.name)) {
    throw new Error(
      `transformModuleDeclaration: expected module name to be an identifier, got ${ts.SyntaxKind[node.name.kind]}`
    )
  }
  const nameIdentifier = transformIdentifier(context, node.name)
  const exportScope = getIdentifierExportScope(context, nameIdentifier)

  const isNonModuleMergeable = !context.isModule && (!currentNamespace || exportScope)

  const isFirstDeclaration =
    symbol === undefined ||
    (!symbol.declarations?.some((d) => ts.isClassLike(d) || ts.isFunctionDeclaration(d)) &&
      ts.getOriginalNode(node) === symbol.declarations?.find(ts.isModuleDeclaration))

  if (isNonModuleMergeable) {
    const localDeclaration = createLocalOrExportedOrGlobalDeclaration(
      context,
      nameIdentifier,
      luaExpressions.createBinaryExpression(
        addExportToIdentifier(context, nameIdentifier),
        luaExpressions.createTableExpression(),
        luaCore.SyntaxKind.OrOperator
      )
    )

    result.push(...localDeclaration)
  } else if (isFirstDeclaration) {
    const localDeclaration = createLocalOrExportedOrGlobalDeclaration(
      context,
      nameIdentifier,
      luaExpressions.createTableExpression()
    )

    result.push(...localDeclaration)
  }

  if (
    (isNonModuleMergeable || isFirstDeclaration) &&
    exportScope &&
    hasExports &&
    moduleHasEmittedBody(node)
  ) {
    const localDeclaration = createHoistableVariableDeclarationStatement(
      context,
      createModuleLocalNameIdentifier(context, node),
      createExportedIdentifier(context, nameIdentifier, exportScope)
    )

    result.push(localDeclaration)
  }

  context.currentNamespaces = node

  if (moduleHasEmittedBody(node)) {
    context.pushScope(ScopeType.Block, node)
    const statements = performHoisting(
      context,
      context.transformStatements(ts.isModuleBlock(node.body) ? node.body.statements : node.body)
    )
    context.popScope()
    result.push(luaStatements.createDoStatement(statements))
  }

  context.currentNamespaces = currentNamespace

  return result
}
