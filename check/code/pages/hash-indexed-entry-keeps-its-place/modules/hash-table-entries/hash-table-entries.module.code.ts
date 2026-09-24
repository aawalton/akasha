import { parsedAs } from "akasha/code/reading/modules/code-source/code-source.module.code.ts"
import ts from "typescript"

export type Reader = (path: string) => string | null

export type TableRead =
  | { readonly entries: readonly string[]; readonly paths: readonly string[] }
  | { readonly unread: string; readonly paths: readonly string[] }

type Shape = "array" | "record"

type Held = {
  readonly shape: Shape
  readonly entries: readonly string[]
}

type Unread = { readonly unread: string }

type Found = Held | Unread

type Scope = {
  readonly path: string
  readonly source: ts.SourceFile
}

type Reading = {
  readonly read: Reader
  readonly paths: Set<string>
  readonly sources: Map<string, ts.SourceFile | null>
}

type Imported = {
  readonly path: string
  readonly name: string
}

const SPECIFIER = "akasha/"

const KEEPING_ORDER: ReadonlySet<string> = new Set(["data", "ids", "list"])

const OBJECT = "Object"

const OBJECT_READS: ReadonlySet<string> = new Set(["keys", "values", "entries"])

const IDENTIFYING = "id"

const DEEPEST = 32

const INDEX_KEY = /^(0|[1-9][0-9]*)$/

const LARGEST_INDEX = 4294967294

const SPACING = /\s+/g

const SPACE = " "

function arrayIndexed(key: string): boolean {
  return INDEX_KEY.test(key) && Number(key) <= LARGEST_INDEX
}

export function keyOrder(keys: readonly string[]): readonly string[] {
  const indexed = keys.filter(arrayIndexed).sort((one, two) => Number(one) - Number(two))
  return [...indexed, ...keys.filter((one) => !arrayIndexed(one))]
}

function unwrapped(node: ts.Expression): ts.Expression {
  if (
    ts.isParenthesizedExpression(node) ||
    ts.isAsExpression(node) ||
    ts.isSatisfiesExpression(node) ||
    ts.isTypeAssertionExpression(node) ||
    ts.isNonNullExpression(node)
  ) {
    return unwrapped(node.expression)
  }
  return node
}

function said(scope: Scope, node: ts.Node, why: string): Unread {
  const line = scope.source.getLineAndCharacterOfPosition(node.getStart(scope.source)).line + 1
  return { unread: `${scope.path} line ${line} ${why}` }
}

function literalOf(node: ts.Expression): string | null {
  const bare = unwrapped(node)
  if (ts.isStringLiteral(bare) || ts.isNoSubstitutionTemplateLiteral(bare)) return bare.text
  if (ts.isNumericLiteral(bare)) return String(Number(bare.text))
  return null
}

function keyOf(name: ts.PropertyName): string | null {
  if (ts.isIdentifier(name) || ts.isPrivateIdentifier(name)) return name.text
  if (ts.isStringLiteral(name) || ts.isNoSubstitutionTemplateLiteral(name)) return name.text
  if (ts.isNumericLiteral(name)) return String(Number(name.text))
  if (ts.isComputedPropertyName(name)) return literalOf(name.expression)
  return null
}

function collapsed(scope: Scope, node: ts.Node): string {
  return node.getText(scope.source).replace(SPACING, SPACE)
}

function identifiedBy(scope: Scope, node: ts.Expression): string {
  const bare = unwrapped(node)
  const literal = literalOf(bare)
  if (literal !== null) return literal
  if (ts.isObjectLiteralExpression(bare)) {
    for (const one of bare.properties) {
      if (!ts.isPropertyAssignment(one) || keyOf(one.name) !== IDENTIFYING) continue
      const named = literalOf(one.initializer)
      if (named !== null) return named
    }
  }
  return collapsed(scope, bare)
}

function counted(entries: readonly string[]): readonly string[] {
  const seen = new Map<string, number>()
  return entries.map((one) => {
    const times = (seen.get(one) ?? 0) + 1
    seen.set(one, times)
    return times === 1 ? one : `${one} (${times})`
  })
}

function sourceAt(reading: Reading, path: string): ts.SourceFile | null {
  if (reading.sources.has(path)) return reading.sources.get(path) ?? null
  reading.paths.add(path)
  const text = reading.read(path)
  const made = text === null ? null : parsedAs(path, text)
  reading.sources.set(path, made)
  return made
}

function declaredIn(source: ts.SourceFile, name: string): ts.Expression | null {
  for (const statement of source.statements) {
    if (!ts.isVariableStatement(statement)) continue
    for (const one of statement.declarationList.declarations) {
      if (ts.isIdentifier(one.name) && one.name.text === name) return one.initializer ?? null
    }
  }
  return null
}

function importedIn(source: ts.SourceFile, name: string): Imported | null {
  for (const statement of source.statements) {
    if (!ts.isImportDeclaration(statement)) continue
    const bound = statement.importClause?.namedBindings
    if (bound === undefined || !ts.isNamedImports(bound)) continue
    const specifier = statement.moduleSpecifier
    if (!ts.isStringLiteral(specifier) || !specifier.text.startsWith(SPECIFIER)) continue
    for (const one of bound.elements) {
      if (one.name.text !== name) continue
      return {
        path: specifier.text.slice(SPECIFIER.length),
        name: (one.propertyName ?? one.name).text,
      }
    }
  }
  return null
}

function namedIn(reading: Reading, scope: Scope, name: string, depth: number): Found {
  const declared = declaredIn(scope.source, name)
  if (declared !== null) return heldIn(reading, scope, declared, depth + 1)
  const imported = importedIn(scope.source, name)
  if (imported === null) return { unread: `${scope.path} declares no \`${name}\`` }
  const source = sourceAt(reading, imported.path)
  if (source === null) {
    return { unread: `${imported.path}, which \`${name}\` is imported from, is no file` }
  }
  return namedIn(reading, { path: imported.path, source }, imported.name, depth + 1)
}

function joined(into: string[], held: readonly string[], shape: Shape): undefined {
  if (shape === "array") {
    into.push(...held)
    return
  }
  const had = new Set(into)
  for (const one of held) {
    if (had.has(one)) continue
    had.add(one)
    into.push(one)
  }
}

function arrayIn(
  reading: Reading,
  scope: Scope,
  node: ts.ArrayLiteralExpression,
  depth: number
): Found {
  const entries: string[] = []
  for (const one of node.elements) {
    if (!ts.isSpreadElement(one)) {
      entries.push(identifiedBy(scope, one))
      continue
    }
    const inner = heldIn(reading, scope, one.expression, depth + 1)
    if ("unread" in inner) return inner
    if (inner.shape !== "array") return said(scope, one, "spreads a record into an array")
    joined(entries, inner.entries, "array")
  }
  return { shape: "array", entries }
}

function recordIn(
  reading: Reading,
  scope: Scope,
  node: ts.ObjectLiteralExpression,
  depth: number
): Found {
  const entries: string[] = []
  for (const one of node.properties) {
    if (ts.isSpreadAssignment(one)) {
      const inner = heldIn(reading, scope, one.expression, depth + 1)
      if ("unread" in inner) return inner
      if (inner.shape !== "record") return said(scope, one, "spreads an array into a record")
      joined(entries, inner.entries, "record")
      continue
    }
    const key = one.name === undefined ? null : keyOf(one.name)
    if (key === null) return said(scope, one, "names a key that is not written out")
    joined(entries, [key], "record")
  }
  return { shape: "record", entries: keyOrder(entries) }
}

function readingObject(callee: ts.Expression): boolean {
  return (
    ts.isPropertyAccessExpression(callee) &&
    ts.isIdentifier(callee.expression) &&
    callee.expression.text === OBJECT &&
    OBJECT_READS.has(callee.name.text)
  )
}

function calledIn(reading: Reading, scope: Scope, node: ts.CallExpression, depth: number): Found {
  const callee = unwrapped(node.expression)
  const first = node.arguments[0]
  if (first === undefined) return said(scope, node, "calls something handed no table")
  if (ts.isCallExpression(callee)) return heldIn(reading, scope, first, depth + 1)
  if (!readingObject(callee)) {
    return said(scope, node, `calls \`${collapsed(scope, callee)}\`, which is read no further`)
  }
  const inner = heldIn(reading, scope, first, depth + 1)
  if ("unread" in inner) return inner
  return { shape: "array", entries: inner.entries }
}

function heldIn(reading: Reading, scope: Scope, node: ts.Expression, depth: number): Found {
  if (depth > DEEPEST) return said(scope, node, "reaches through more names than are followed")
  const bare = unwrapped(node)
  if (ts.isArrayLiteralExpression(bare)) return arrayIn(reading, scope, bare, depth)
  if (ts.isObjectLiteralExpression(bare)) return recordIn(reading, scope, bare, depth)
  if (ts.isIdentifier(bare)) return namedIn(reading, scope, bare.text, depth)
  if (ts.isCallExpression(bare)) return calledIn(reading, scope, bare, depth)
  if (ts.isPropertyAccessExpression(bare) && KEEPING_ORDER.has(bare.name.text)) {
    return heldIn(reading, scope, bare.expression, depth + 1)
  }
  return said(scope, bare, `holds \`${collapsed(scope, bare)}\`, which is no table`)
}

export function tableIn(read: Reader, path: string, name: string): TableRead {
  const reading: Reading = { read, paths: new Set(), sources: new Map() }
  const source = sourceAt(reading, path)
  const paths = (): readonly string[] => [...reading.paths].sort()
  if (source === null) return { unread: `${path} is no file`, paths: paths() }
  const declared = declaredIn(source, name)
  if (declared === null) return { unread: `${path} declares no \`${name}\``, paths: paths() }
  const found = heldIn(reading, { path, source }, declared, 0)
  if ("unread" in found) return { unread: found.unread, paths: paths() }
  return { entries: counted(found.entries), paths: paths() }
}
