import { dirname, join, resolve } from "node:path"
import ts from "typescript"

const TS = ".ts"

const INSIDE = "akasha/"

const PACKAGES = "node_modules"

export const SETTINGS: ts.CompilerOptions = {
  noEmit: true,
  strict: true,
  noUncheckedIndexedAccess: true,
  allowImportingTsExtensions: true,
  module: ts.ModuleKind.Preserve,
  moduleResolution: ts.ModuleResolutionKind.Bundler,
  target: ts.ScriptTarget.ESNext,
  skipLibCheck: true,
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

export function compiled(path: string): boolean {
  return path.endsWith(TS) && path.startsWith(INSIDE) && !path.includes(`/${PACKAGES}/`)
}

export function insideOf(root: string, at: string): string | null {
  if (!at.endsWith(TS)) return null
  if (at.includes(`/${PACKAGES}/`)) return null
  if (!at.startsWith(`${root}/`)) return null
  const rel = at.slice(root.length + 1)
  return rel.startsWith(INSIDE) ? rel : null
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
    fileExists: (path) =>
      insideOf(root, resolve(path)) === null ? ts.sys.fileExists(path) : read(path) !== undefined,
    directoryExists: (path) => dirs.has(resolve(path)) || ts.sys.directoryExists(path),
    readFile: read,
    getSourceFile: (path, language) => {
      if (insideOf(root, resolve(path)) === null) return base.getSourceFile(path, language)
      const body = read(path)
      return body === undefined ? undefined : ts.createSourceFile(path, body, language, true)
    },
  }
}

export function programOver(root: string, roots: readonly string[], read: Reading): ts.Program {
  return ts.createProgram({
    rootNames: roots.map((one) => join(root, one)),
    options: SETTINGS,
    host: hostOver(root, read, roots),
  })
}

export function typingOver(root: string, roots: readonly string[], read: Reading): Typing {
  const program = programOver(root, roots, read)
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

function contextualIn(typing: Typing, node: ts.Node, name: ts.Node): ts.Symbol | undefined {
  const key = keyOf(name)
  if (key === null) return undefined
  if (ts.isPropertyAssignment(node) || ts.isShorthandPropertyAssignment(node)) {
    const held = node.parent
    if (!ts.isObjectLiteralExpression(held)) return undefined
    return typing.checker.getContextualType(held)?.getProperty(key)
  }
  if (!ts.isBindingElement(node)) return undefined
  const pattern = node.parent
  if (!ts.isObjectBindingPattern(pattern)) return undefined
  return typing.checker.getTypeAtLocation(pattern).getProperty(key)
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
