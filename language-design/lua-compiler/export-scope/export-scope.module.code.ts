import * as ts from "typescript"
import type { TransformationContext } from "../context-transformation-context/context-transformation-context.module.code.ts"
import { requireCreateModuleLocalName } from "../tstl-export-deps/tstl-export-deps.module.code.ts"
import { createExportsIdentifier } from "../tstl-exports-identifier/tstl-exports-identifier.module.code.ts"
import * as luaExpressions from "../tstl-lua-ast-expressions/tstl-lua-ast-expressions.module.code.ts"
import { getSymbolInfo } from "../tstl-symbols/tstl-symbols.module.code.ts"
import { findFirstNodeAbove } from "../tstl-typescript/tstl-typescript.module.code.ts"

export function hasDefaultExportModifier(node: ts.Node): boolean {
  return (
    ts.canHaveModifiers(node) &&
    node.modifiers?.some((modifier) => modifier.kind === ts.SyntaxKind.DefaultKeyword) === true
  )
}

export function hasExportModifier(node: ts.Node): boolean {
  return (
    ts.canHaveModifiers(node) &&
    node.modifiers?.some((modifier) => modifier.kind === ts.SyntaxKind.ExportKeyword) === true
  )
}

export function shouldBeExported(node: ts.Node): boolean {
  if (hasExportModifier(node)) {
    return ts.findAncestor(node, ts.isModuleDeclaration) === undefined
  }
  return false
}

export const createDefaultExportStringLiteral = (
  original?: ts.Node
): luaExpressions.StringLiteral => luaExpressions.createStringLiteral("default", original)

export function getExportedSymbolDeclaration(symbol: ts.Symbol): ts.Declaration | undefined {
  const declarations = symbol.getDeclarations()
  if (declarations) {
    return declarations.find(
      (d) => (ts.getCombinedModifierFlags(d) & ts.ModifierFlags.Export) !== 0
    )
  }
}

export function getSymbolFromIdentifier(
  context: TransformationContext,
  identifier: luaExpressions.Identifier
): ts.Symbol | undefined {
  if (identifier.symbolId !== undefined) {
    const symbolInfo = getSymbolInfo(context, identifier.symbolId)
    if (symbolInfo !== undefined) {
      return symbolInfo.symbol
    }
  }
}

export function getIdentifierExportScope(
  context: TransformationContext,
  identifier: luaExpressions.Identifier
): ts.SourceFile | ts.ModuleDeclaration | undefined {
  const symbol = getSymbolFromIdentifier(context, identifier)
  if (!symbol) {
    return undefined
  }

  return getSymbolExportScope(context, symbol)
}

function isGlobalAugmentation(module: ts.ModuleDeclaration): boolean {
  return (module.flags & ts.NodeFlags.GlobalAugmentation) !== 0
}

export function getSymbolExportScope(
  context: TransformationContext,
  symbol: ts.Symbol
): ts.SourceFile | ts.ModuleDeclaration | undefined {
  const exportedDeclaration = getExportedSymbolDeclaration(symbol)
  if (!exportedDeclaration) {
    return undefined
  }

  const scope = findFirstNodeAbove(
    exportedDeclaration,
    (n): n is ts.SourceFile | ts.ModuleDeclaration =>
      ts.isSourceFile(n) || ts.isModuleDeclaration(n)
  )
  if (!scope) {
    return undefined
  }

  if (ts.isModuleDeclaration(scope) && isGlobalAugmentation(scope)) {
    return undefined
  }

  if (!isSymbolExportedFromScope(context, symbol, scope)) {
    return undefined
  }

  return scope
}

export function getExportedSymbolsFromScope(
  context: TransformationContext,
  scope: ts.SourceFile | ts.ModuleDeclaration
): readonly ts.Symbol[] {
  const scopeSymbol = context.checker.getSymbolAtLocation(
    ts.isSourceFile(scope) ? scope : scope.name
  )
  const exports = scopeSymbol?.exports
  if (exports === undefined) {
    return []
  }

  const it: Iterable<ts.Symbol> = { [Symbol.iterator]: () => exports.values() }
  return [...it]
}

export function getDependenciesOfSymbol(
  context: TransformationContext,
  originalSymbol: ts.Symbol
): readonly ts.Symbol[] {
  return getExportedSymbolsFromScope(context, context.sourceFile).filter((exportSymbol) =>
    exportSymbol.declarations
      ?.filter(ts.isExportSpecifier)
      .map(context.checker.getExportSpecifierLocalTargetSymbol)
      .includes(originalSymbol)
  )
}

export function isSymbolExported(context: TransformationContext, symbol: ts.Symbol): boolean {
  return (
    getExportedSymbolDeclaration(symbol) !== undefined ||
    isSymbolExportedFromScope(context, symbol, context.sourceFile)
  )
}

export function isSymbolExportedFromScope(
  context: TransformationContext,
  symbol: ts.Symbol,
  scope: ts.SourceFile | ts.ModuleDeclaration
): boolean {
  return getExportedSymbolsFromScope(context, scope).includes(symbol)
}

export function addExportToIdentifier(
  context: TransformationContext,
  identifier: luaExpressions.Identifier
): luaExpressions.AssignmentLeftHandSideExpression {
  const exportScope = getIdentifierExportScope(context, identifier)
  return exportScope ? createExportedIdentifier(context, identifier, exportScope) : identifier
}

export function createExportedIdentifier(
  context: TransformationContext,
  identifier: luaExpressions.Identifier,
  exportScope?: ts.SourceFile | ts.ModuleDeclaration
): luaExpressions.AssignmentLeftHandSideExpression {
  if (!identifier.exportable) {
    return identifier
  }

  const exportTable =
    exportScope && ts.isModuleDeclaration(exportScope)
      ? requireCreateModuleLocalName()(context, exportScope)
      : createExportsIdentifier()

  return luaExpressions.createTableIndexExpression(
    exportTable,
    luaExpressions.createStringLiteral(identifier.text)
  )
}

export function createDefaultExportExpression(
  node: ts.Node
): luaExpressions.AssignmentLeftHandSideExpression {
  return luaExpressions.createTableIndexExpression(
    createExportsIdentifier(),
    createDefaultExportStringLiteral(node),
    node
  )
}
