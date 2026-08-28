import ts from "typescript"

export type ExtractorKind = "union-type" | "const-tuple" | "object-keys" | "array-field"

export interface CodegenIdentityEndpoint {
  readonly file: string
  readonly kind: ExtractorKind
  readonly symbol: string
  readonly field?: string
}

export interface CodegenIdentityRemedy {
  readonly file: string
}

export interface CodegenIdentityPair {
  readonly name: string
  readonly canonical: CodegenIdentityEndpoint
  readonly mirror: CodegenIdentityEndpoint
}

export interface CodegenIdentityPairSources {
  readonly pair: CodegenIdentityPair
  readonly canonicalText: string
  readonly mirrorText: string
}

export interface CodegenIdentityDrift {
  readonly name: string
  readonly canonicalFile: string
  readonly canonicalSymbol: string
  readonly mirrorFile: string
  readonly mirrorSymbol: string
  readonly missingFromMirror: readonly string[]
  readonly extraInMirror: readonly string[]
}

export class CodegenIdentityExtractError extends Error {}

export class CodegenIdentityRemedyError extends Error {}

function isEmittedPath(file: string): boolean {
  return file.endsWith(".generated.ts") || file.includes("/generated/")
}

export function remedyFileFor(
  mirror: CodegenIdentityEndpoint,
  generators: ReadonlyMap<string, CodegenIdentityRemedy>
): CodegenIdentityRemedy {
  const generator = generators.get(mirror.file)
  if (generator !== undefined) return generator
  if (isEmittedPath(mirror.file))
    throw new CodegenIdentityRemedyError(
      `mirror "${mirror.file}" is an emitted file and no generator is registered for it, so a ` +
        "refusal would name a file its own header forbids editing. Add the generator that emits " +
        "it to MIRROR_GENERATORS in codegen-type-identity-pairs.ts."
    )
  return { file: mirror.file }
}

function parse(text: string, file: string): ts.SourceFile {
  return ts.createSourceFile(file, text, ts.ScriptTarget.Latest, true)
}

function fail(endpoint: CodegenIdentityEndpoint, detail: string): never {
  throw new CodegenIdentityExtractError(
    `${endpoint.file}: ${endpoint.kind} "${endpoint.symbol}" ${detail}`
  )
}

function unwrap(node: ts.Expression): ts.Expression {
  let cur = node
  while (
    ts.isAsExpression(cur) ||
    ts.isSatisfiesExpression(cur) ||
    ts.isParenthesizedExpression(cur)
  ) {
    cur = cur.expression
  }
  return cur
}

function findConstInitializer(sf: ts.SourceFile, endpoint: CodegenIdentityEndpoint): ts.Expression {
  const matches: ts.Expression[] = []
  const visit = (node: ts.Node): undefined => {
    if (
      ts.isVariableDeclaration(node) &&
      ts.isIdentifier(node.name) &&
      node.name.text === endpoint.symbol &&
      node.initializer
    ) {
      matches.push(node.initializer)
    }
    ts.forEachChild(node, visit)
  }
  visit(sf)
  if (matches.length > 1) fail(endpoint, `is declared ${matches.length}× — ambiguous`)
  const only = matches[0]
  if (only === undefined) fail(endpoint, "declaration not found")
  return only
}

function stringOf(node: ts.Expression): string | undefined {
  if (ts.isStringLiteralLike(node)) return node.text
  return undefined
}

function extractUnionType(sf: ts.SourceFile, endpoint: CodegenIdentityEndpoint): Set<string> {
  for (const stmt of sf.statements) {
    if (!ts.isTypeAliasDeclaration(stmt) || stmt.name.text !== endpoint.symbol) continue
    const members = new Set<string>()
    const parts = ts.isUnionTypeNode(stmt.type) ? stmt.type.types : [stmt.type]
    for (const part of parts) {
      if (ts.isLiteralTypeNode(part) && ts.isStringLiteralLike(part.literal)) {
        members.add(part.literal.text)
      }
    }
    if (members.size === 0) fail(endpoint, "matched no string-literal union members")
    return members
  }
  return fail(endpoint, "type alias not found")
}

function extractConstTuple(sf: ts.SourceFile, endpoint: CodegenIdentityEndpoint): Set<string> {
  const init = unwrap(findConstInitializer(sf, endpoint))
  if (!ts.isArrayLiteralExpression(init)) fail(endpoint, "initializer is not an array literal")
  const members = new Set<string>()
  for (const el of init.elements) {
    const s = stringOf(el)
    if (s === undefined) fail(endpoint, "contains a non-string element")
    members.add(s)
  }
  if (members.size === 0) fail(endpoint, "is an empty tuple")
  return members
}

function extractObjectKeys(sf: ts.SourceFile, endpoint: CodegenIdentityEndpoint): Set<string> {
  const init = unwrap(findConstInitializer(sf, endpoint))
  if (!ts.isObjectLiteralExpression(init)) fail(endpoint, "initializer is not an object literal")
  const members = new Set<string>()
  for (const prop of init.properties) {
    if (ts.isSpreadAssignment(prop))
      fail(endpoint, "contains a spread — key set is not statically closed")
    const name = prop.name
    if (name === undefined) continue
    if (ts.isIdentifier(name)) members.add(name.text)
    else if (ts.isStringLiteralLike(name)) members.add(name.text)
    else fail(endpoint, "contains a computed / non-literal key")
  }
  if (members.size === 0) fail(endpoint, "is an empty object")
  return members
}

function extractArrayField(sf: ts.SourceFile, endpoint: CodegenIdentityEndpoint): Set<string> {
  const field = endpoint.field
  if (field === undefined) fail(endpoint, "array-field requires a `field`")
  const init = unwrap(findConstInitializer(sf, endpoint))
  if (!ts.isArrayLiteralExpression(init)) fail(endpoint, "initializer is not an array literal")
  const members = new Set<string>()
  for (const el of init.elements) {
    const obj = unwrap(el)
    if (!ts.isObjectLiteralExpression(obj)) fail(endpoint, "contains a non-object element")
    let found = false
    for (const prop of obj.properties) {
      if (!ts.isPropertyAssignment(prop) || prop.name === undefined) continue
      const key = ts.isIdentifier(prop.name)
        ? prop.name.text
        : ts.isStringLiteralLike(prop.name)
          ? prop.name.text
          : undefined
      if (key !== field) continue
      const s = stringOf(prop.initializer)
      if (s === undefined) fail(endpoint, `field "${field}" is not a string literal`)
      members.add(s)
      found = true
    }
    if (!found) fail(endpoint, `an element is missing field "${field}"`)
  }
  if (members.size === 0) fail(endpoint, "is an empty array")
  return members
}

export function extractMembers(text: string, endpoint: CodegenIdentityEndpoint): Set<string> {
  const sf = parse(text, endpoint.file)
  switch (endpoint.kind) {
    case "union-type":
      return extractUnionType(sf, endpoint)
    case "const-tuple":
      return extractConstTuple(sf, endpoint)
    case "object-keys":
      return extractObjectKeys(sf, endpoint)
    case "array-field":
      return extractArrayField(sf, endpoint)
    default:
      return assertNever(endpoint.kind)
  }
}

function assertNever(x: never): never {
  throw new CodegenIdentityExtractError(`unhandled extractor kind: ${String(x)}`)
}

function sortedDiff(a: Set<string>, b: Set<string>): readonly string[] {
  return [...a].filter((m) => !b.has(m)).sort()
}

export function findCodegenTypeIdentityDrift(
  sources: readonly CodegenIdentityPairSources[]
): readonly CodegenIdentityDrift[] {
  const drift: CodegenIdentityDrift[] = []
  for (const { pair, canonicalText, mirrorText } of sources) {
    const canonical = extractMembers(canonicalText, pair.canonical)
    const mirror = extractMembers(mirrorText, pair.mirror)
    const missingFromMirror = sortedDiff(canonical, mirror)
    const extraInMirror = sortedDiff(mirror, canonical)
    if (missingFromMirror.length > 0 || extraInMirror.length > 0) {
      drift.push({
        name: pair.name,
        canonicalFile: pair.canonical.file,
        canonicalSymbol: pair.canonical.symbol,
        mirrorFile: pair.mirror.file,
        mirrorSymbol: pair.mirror.symbol,
        missingFromMirror,
        extraInMirror,
      })
    }
  }
  return drift
}
