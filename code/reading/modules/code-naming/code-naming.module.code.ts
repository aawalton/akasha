import { resolve } from "node:path"
import {
  insideOf,
  type Typing,
} from "akasha/code/reading/modules/code-typing/code-typing.module.code.ts"
import ts from "typescript"

const GLOBAL_TABLE = "globalThis"

export type Naming = {
  readonly path: string
  readonly start: number
  readonly end: number
  readonly quoted: boolean
  readonly shorthand: boolean
}

export function keyOf(name: ts.Node): string | null {
  return ts.isIdentifier(name) || ts.isStringLiteral(name) ? name.text : null
}

function namedIn(node: ts.Node): ts.Node | null {
  if (ts.isPropertyAccessExpression(node)) return node.name
  if (ts.isPropertySignature(node) || ts.isPropertyAssignment(node)) return node.name
  if (ts.isMethodSignature(node) || ts.isPropertyDeclaration(node)) return node.name
  if (ts.isShorthandPropertyAssignment(node)) return node.name
  if (ts.isBindingElement(node)) return node.propertyName ?? node.name
  if (ts.isElementAccessExpression(node)) {
    return ts.isStringLiteral(node.argumentExpression) ? node.argumentExpression : null
  }
  return null
}

function shorthandIn(node: ts.Node): boolean {
  if (ts.isShorthandPropertyAssignment(node)) return true
  return ts.isBindingElement(node) && node.propertyName === undefined
}

function propertyIn(type: ts.Type, key: string): ts.Symbol | undefined {
  const own = type.getProperty(key)
  if (own !== undefined) return own
  if (!type.isUnion()) return undefined
  const found = new Set<ts.Symbol>()
  for (const one of type.types) {
    const held = one.getProperty(key)
    if (held !== undefined) found.add(held)
  }
  return found.size === 1 ? [...found][0] : undefined
}

function contextualIn(typing: Typing, node: ts.Node, name: ts.Node): ts.Symbol | undefined {
  const key = keyOf(name)
  if (key === null) return undefined
  if (ts.isPropertyAssignment(node) || ts.isShorthandPropertyAssignment(node)) {
    const held = node.parent
    if (!ts.isObjectLiteralExpression(held)) return undefined
    const type = typing.checker.getContextualType(held)
    return type === undefined ? undefined : propertyIn(type, key)
  }
  if (!ts.isBindingElement(node)) return undefined
  const pattern = node.parent
  if (!ts.isObjectBindingPattern(pattern)) return undefined
  return propertyIn(typing.checker.getTypeAtLocation(pattern), key)
}

function declaring(symbol: ts.Symbol | undefined, declared: ReadonlySet<ts.Node>): boolean {
  for (const one of symbol?.declarations ?? []) {
    if (declared.has(one)) return true
  }
  return false
}

export function declaredNamed(typing: Typing, path: string, name: string): readonly ts.Node[] {
  const source = typing.sourceAt(path)
  if (source === null) return []
  const found: ts.Node[] = []
  const walk = (node: ts.Node): undefined => {
    if (ts.isFunctionDeclaration(node) && node.name?.text === name) found.push(node)
    if (ts.isTypeAliasDeclaration(node) && node.name.text === name) found.push(node)
    if (ts.isInterfaceDeclaration(node) && node.name.text === name) found.push(node)
    if (ts.isVariableDeclaration(node) && ts.isIdentifier(node.name) && node.name.text === name) {
      found.push(node)
    }
    ts.forEachChild(node, walk)
  }
  ts.forEachChild(source, walk)
  return found
}

function declaredAs(node: ts.Node): ts.Node | null {
  if (ts.isFunctionDeclaration(node)) return node.name ?? null
  if (ts.isTypeAliasDeclaration(node) || ts.isInterfaceDeclaration(node)) return node.name
  if (ts.isVariableDeclaration(node) || ts.isPropertySignature(node)) return node.name
  return null
}

export function declaredOn(typing: Typing, path: string, node: ts.Node): number | null {
  const source = typing.sourceAt(path)
  if (source === null) return null
  const named = declaredAs(node) ?? node
  return source.getLineAndCharacterOfPosition(named.getStart(source)).line + 1
}

export function reachedFrom(typing: Typing, at: ts.Node, name: string): readonly ts.Node[] {
  const found: ts.Node[] = []
  for (const symbol of typing.checker.getSymbolsInScope(at, ts.SymbolFlags.All)) {
    if (symbol.name !== name) continue
    found.push(...(symbol.declarations ?? []))
  }
  return found
}

export function importedUnderAnother(source: ts.SourceFile, start: number): boolean {
  for (const one of source.statements) {
    if (!ts.isImportDeclaration(one)) continue
    const bound = one.importClause?.namedBindings
    if (bound === undefined || !ts.isNamedImports(bound)) continue
    for (const each of bound.elements) {
      if (each.propertyName?.getStart(source) === start) return true
    }
  }
  return false
}

export function namingOf(
  typing: Typing,
  root: string,
  declared: ReadonlySet<ts.Node>
): readonly Naming[] {
  const found: Naming[] = []
  for (const source of typing.program.getSourceFiles()) {
    if (source.isDeclarationFile) continue
    const path = insideOf(root, resolve(source.fileName))
    if (path === null) continue
    const walk = (node: ts.Node): undefined => {
      const name = namedIn(node)
      if (name !== null) {
        const own = typing.checker.getSymbolAtLocation(name)
        if (declaring(own, declared) || declaring(contextualIn(typing, node, name), declared)) {
          found.push({
            path,
            start: name.getStart(source),
            end: name.getEnd(),
            quoted: ts.isStringLiteral(name),
            shorthand: shorthandIn(node),
          })
        }
      }
      ts.forEachChild(node, walk)
    }
    ts.forEachChild(source, walk)
  }
  return found
}

export function spelledAs(one: Naming, was: string, now: string): string {
  if (one.quoted) return JSON.stringify(now)
  return one.shorthand ? `${now}: ${was}` : now
}

export function exportsNamed(typing: Typing, path: string, name: string): readonly ts.Node[] {
  const source = typing.sourceAt(path)
  if (source === null) return []
  const held = typing.checker.getSymbolAtLocation(source)
  if (held === undefined) return []
  for (const one of typing.checker.getExportsOfModule(held)) {
    if (one.name === name) return one.declarations ?? []
  }
  return []
}

function aliasedIn(typing: Typing, symbol: ts.Symbol): ts.Symbol {
  if ((symbol.flags & ts.SymbolFlags.Alias) === 0) return symbol
  try {
    return typing.checker.getAliasedSymbol(symbol)
  } catch {
    return symbol
  }
}

function shorthandFor(node: ts.Identifier): boolean {
  const up = node.parent
  return up !== undefined && ts.isShorthandPropertyAssignment(up) && up.name === node
}

function renamable(symbol: ts.Symbol | undefined): boolean {
  for (const one of symbol?.declarations ?? []) {
    if (ts.isImportSpecifier(one) && one.propertyName !== undefined) return false
  }
  return true
}

function symbolOf(typing: Typing, node: ts.Identifier): ts.Symbol | undefined {
  const up = node.parent
  if (up !== undefined && ts.isShorthandPropertyAssignment(up) && up.name === node) {
    return typing.checker.getShorthandAssignmentValueSymbol(up)
  }
  if (up !== undefined && ts.isImportSpecifier(up) && up.propertyName === node) {
    const alias = typing.checker.getSymbolAtLocation(up.name)
    return alias === undefined ? undefined : aliasedIn(typing, alias)
  }
  return typing.checker.getSymbolAtLocation(node)
}

function partsOf(type: ts.Type): readonly ts.Type[] {
  return type.isUnion() || type.isIntersection() ? type.types : [type]
}

function globalTable(typing: Typing, node: ts.Expression): boolean {
  for (const one of partsOf(typing.checker.getTypeAtLocation(node))) {
    if (one.getSymbol()?.getName() === GLOBAL_TABLE) return true
  }
  return false
}

function namesOf(declared: ReadonlySet<ts.Node>): ReadonlySet<string> {
  const found = new Set<string>()
  for (const one of declared) {
    const named = declaredAs(one)
    if (named !== null && ts.isIdentifier(named)) found.add(named.text)
  }
  return found
}

function keyedOn(node: ts.Node): ts.Node | null {
  if (ts.isPropertyAccessExpression(node)) return node.name
  if (!ts.isElementAccessExpression(node)) return null
  return ts.isStringLiteral(node.argumentExpression) ? node.argumentExpression : null
}

function globalKeyIn(typing: Typing, node: ts.Node, names: ReadonlySet<string>): ts.Node | null {
  const name = keyedOn(node)
  if (name === null) return null
  const key = keyOf(name)
  if (key === null || !names.has(key)) return null
  const held = node as ts.PropertyAccessExpression | ts.ElementAccessExpression
  return globalTable(typing, held.expression) ? name : null
}

export function referencesOf(
  typing: Typing,
  root: string,
  declared: ReadonlySet<ts.Node>
): readonly Naming[] {
  const found: Naming[] = []
  const names = namesOf(declared)
  for (const source of typing.program.getSourceFiles()) {
    const path = insideOf(root, resolve(source.fileName))
    if (path === null) continue
    const seen = new Set<number>()
    const take = (at: ts.Node, quoted: boolean, shorthand: boolean): undefined => {
      const start = at.getStart(source)
      if (seen.has(start)) return
      seen.add(start)
      found.push({ path, start, end: at.getEnd(), quoted, shorthand })
    }
    const walk = (node: ts.Node): undefined => {
      if (ts.isIdentifier(node)) {
        const own = symbolOf(typing, node)
        const reached = own === undefined ? undefined : aliasedIn(typing, own)
        const named = declaring(own, declared) || declaring(reached, declared)
        if (named && renamable(own)) take(node, false, shorthandFor(node))
      }
      const key = globalKeyIn(typing, node, names)
      if (key !== null) take(key, ts.isStringLiteral(key), false)
      ts.forEachChild(node, walk)
    }
    ts.forEachChild(source, walk)
  }
  return found
}

export function boundAs(one: Naming, was: string, now: string): string {
  if (one.quoted) return JSON.stringify(now)
  return one.shorthand ? `${was}: ${now}` : now
}
