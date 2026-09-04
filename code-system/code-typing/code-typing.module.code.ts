import { realpathSync } from "node:fs"
import { dirname, join, resolve } from "node:path"
import { buildInfoAt, stamped, versionOf, writtenTo } from "@akasha/code-system/typing-keeping"
import ts from "typescript"

const TS = ".ts"

const TSX = ".tsx"

const INSIDE = "akasha/"

const PACKAGES = "node_modules"

const MANIFEST = "package.json"

export const SETTINGS: ts.CompilerOptions = {
  noEmit: true,
  strict: true,
  noUncheckedIndexedAccess: true,
  allowImportingTsExtensions: true,
  module: ts.ModuleKind.Preserve,
  moduleResolution: ts.ModuleResolutionKind.Bundler,
  target: ts.ScriptTarget.ESNext,
  skipLibCheck: true,
  jsx: ts.JsxEmit.ReactJSX,
  incremental: true,
}

export type Reading = (at: string) => string | undefined

export type Typing = {
  readonly program: ts.Program
  readonly checker: ts.TypeChecker
  readonly sourceAt: (path: string) => ts.SourceFile | null
}

export type Naming = {
  readonly path: string
  readonly start: number
  readonly end: number
  readonly quoted: boolean
  readonly shorthand: boolean
}

export function typed(path: string): boolean {
  return path.endsWith(TS) || path.endsWith(TSX)
}

export function compiled(path: string): boolean {
  return typed(path) && path.startsWith(INSIDE) && !path.includes(`/${PACKAGES}/`)
}

export function manifested(path: string): boolean {
  return path === MANIFEST || path.endsWith(`/${MANIFEST}`)
}

export function insideOf(root: string, at: string): string | null {
  if (!typed(at)) return null
  if (at.includes(`/${PACKAGES}/`)) return null
  if (!at.startsWith(`${root}/`)) return null
  const rel = at.slice(root.length + 1)
  return rel.startsWith(INSIDE) ? rel : null
}

const LINKED = new Map<string, string>()

function realOf(at: string): string {
  const found = LINKED.get(at)
  if (found !== undefined) return found
  let real = at
  try {
    real = realpathSync(at)
  } catch {
    real = at
  }
  LINKED.set(at, real)
  return real
}

export function linkedOf(root: string, at: string): string {
  const mark = `${root}/${PACKAGES}/`
  if (!at.startsWith(mark)) return at
  for (let to = at.indexOf("/", mark.length); to > 0; to = at.indexOf("/", to + 1)) {
    const head = at.slice(0, to)
    const real = realOf(head)
    if (real !== head) return `${real}${at.slice(to)}`
  }
  return at
}

export function manifestOf(root: string, at: string): string | null {
  if (!manifested(at)) return null
  const real = linkedOf(root, at)
  if (!real.startsWith(`${root}/`)) return null
  const rel = real.slice(root.length + 1)
  if (rel.includes(`/${PACKAGES}/`)) return null
  return rel.startsWith(INSIDE) ? rel : null
}

export function servedOf(root: string, at: string): string | null {
  const real = linkedOf(root, at)
  return insideOf(root, real) ?? manifestOf(root, real)
}

function directoriesIn(root: string, every: readonly string[]): ReadonlySet<string> {
  const held = new Set<string>()
  for (const one of every) {
    let at = dirname(join(root, one))
    while (at !== "/" && !held.has(at)) {
      held.add(at)
      at = dirname(at)
    }
  }
  return held
}

export function hostOver(root: string, read: Reading, every: readonly string[]): ts.CompilerHost {
  const base = ts.createCompilerHost(SETTINGS, true)
  const dirs = directoriesIn(root, every)
  return {
    ...base,
    getCurrentDirectory: () => root,
    realpath: (path) => linkedOf(root, resolve(base.realpath?.(path) ?? path)),
    fileExists: (path) =>
      servedOf(root, resolve(path)) === null ? ts.sys.fileExists(path) : read(path) !== undefined,
    directoryExists: (path) => dirs.has(resolve(path)) || ts.sys.directoryExists(path),
    readFile: read,
    writeFile: writtenTo,
    createHash: versionOf,
    getSourceFile: (path, language) => {
      if (insideOf(root, resolve(path)) === null) return stamped(base.getSourceFile(path, language))
      const body = read(path)
      return body === undefined
        ? undefined
        : stamped(ts.createSourceFile(path, body, language, true))
    },
  }
}

export function readingOf(root: string, textOf: (path: string) => string | null): Reading {
  return (at) => {
    const full = linkedOf(root, resolve(at))
    const rel = insideOf(root, full)
    if (rel !== null) {
      const text = textOf(rel)
      return text === null ? undefined : text
    }
    const named = manifestOf(root, full)
    if (named === null) return ts.sys.readFile(at)
    return textOf(named) ?? ts.sys.readFile(at)
  }
}

export function programOver(root: string, roots: readonly string[], read: Reading): ts.Program {
  const built = ts.createIncrementalProgram({
    rootNames: roots.map((one) => join(root, one)),
    options: { ...SETTINGS, tsBuildInfoFile: buildInfoAt(root, roots) },
    host: hostOver(root, read, roots),
  })
  built.getSemanticDiagnostics()
  built.emit()
  return { ...built.getProgram(), getSemanticDiagnostics: built.getSemanticDiagnostics }
}

export function typingOver(root: string, roots: readonly string[], read: Reading): Typing {
  const program = ts.createProgram({
    rootNames: roots.map((one) => join(root, one)),
    options: SETTINGS,
    host: hostOver(root, read, roots),
  })
  return {
    program,
    checker: program.getTypeChecker(),
    sourceAt: (path) => program.getSourceFile(join(root, path)) ?? null,
  }
}

function keyOf(name: ts.Node): string | null {
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

export function declarationsNamed(typing: Typing, path: string, key: string): readonly ts.Node[] {
  const source = typing.sourceAt(path)
  if (source === null) return []
  const found: ts.Node[] = []
  const walk = (node: ts.Node): undefined => {
    if (ts.isPropertySignature(node) && keyOf(node.name) === key) found.push(node)
    ts.forEachChild(node, walk)
  }
  ts.forEachChild(source, walk)
  return found
}

export type Keying = {
  readonly node: ts.Node
  readonly declares: boolean
  readonly shorthand: boolean
  readonly names: readonly ts.Node[]
  readonly keys: readonly ts.Node[]
}

function namesOf(typing: Typing, node: ts.Node): readonly ts.Node[] {
  if (!ts.isShorthandPropertyAssignment(node)) return []
  return typing.checker.getShorthandAssignmentValueSymbol(node)?.declarations ?? []
}

function keysOf(typing: Typing, node: ts.Node, name: ts.Node): readonly ts.Node[] {
  const found = new Set<ts.Node>()
  for (const one of typing.checker.getSymbolAtLocation(name)?.declarations ?? []) found.add(one)
  for (const one of contextualIn(typing, node, name)?.declarations ?? []) found.add(one)
  return [...found]
}

export function keyingsIn(typing: Typing, path: string, key: string): readonly Keying[] {
  const source = typing.sourceAt(path)
  if (source === null) return []
  const found: Keying[] = []
  const walk = (node: ts.Node): undefined => {
    const name = namedIn(node)
    if (name !== null && keyOf(name) === key) {
      found.push({
        node,
        declares: ts.isPropertySignature(node),
        shorthand: shorthandIn(node),
        names: namesOf(typing, node),
        keys: keysOf(typing, node, name),
      })
    }
    ts.forEachChild(node, walk)
  }
  ts.forEachChild(source, walk)
  return found
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

export function referencesOf(
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
      if (ts.isIdentifier(node)) {
        const own = symbolOf(typing, node)
        const reached = own === undefined ? undefined : aliasedIn(typing, own)
        const named = declaring(own, declared) || declaring(reached, declared)
        if (named && renamable(own)) {
          found.push({
            path,
            start: node.getStart(source),
            end: node.getEnd(),
            quoted: false,
            shorthand: shorthandFor(node),
          })
        }
      }
      ts.forEachChild(node, walk)
    }
    ts.forEachChild(source, walk)
  }
  return found
}

export function boundAs(one: Naming, was: string, now: string): string {
  return one.shorthand ? `${was}: ${now}` : now
}
