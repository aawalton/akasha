import { literalOf, parsedAs } from "@akasha/code-system/code-source"
import { respelled } from "@akasha/code-system/export-respelling"
import { type Named, namersOf, slugsOfType } from "@akasha/indexes"
import { exportedAs } from "@akasha/pages/page-export-name"
import { slugFor } from "@akasha/pages/page-property-key"
import ts from "typescript"
import { importingOf } from "../../../../pages/indexes/path-naming/path-naming.module.code.ts"

const KEBAB = /^[a-z][a-z0-9]*(-[a-z0-9]+)*$/

const TYPED = ".ts"

const SLUG = "slug"

const PAGE_TYPE_SLUG = "pageTypeSlug"

const ID = "id"

export type Asked = {
  readonly at: string
  readonly to: string
}

export type Renamed = {
  readonly bodies: ReadonlyMap<string, string> | null
  readonly refused: string | null
}

type Spot = {
  readonly start: number
  readonly end: number
  readonly put: string
}

type Renaming = {
  readonly was: string
  readonly now: string
  readonly pageTypeSlug: string
}

type Reach =
  | { readonly namers: readonly Named[]; readonly slugs: readonly string[] }
  | { readonly unread: string }

function refusing(why: string): Renamed {
  return { bodies: null, refused: why }
}

function keyOf(held: ts.PropertyAssignment): string | null {
  const name = held.name
  return ts.isIdentifier(name) || ts.isStringLiteral(name) ? name.text : null
}

function exported(statement: ts.VariableStatement): boolean {
  return statement.modifiers?.some((one) => one.kind === ts.SyntaxKind.ExportKeyword) === true
}

function textsOf(held: ts.ObjectLiteralExpression): ReadonlyMap<string, ts.StringLiteral> {
  const found = new Map<string, ts.StringLiteral>()
  for (const one of held.properties) {
    if (!ts.isPropertyAssignment(one)) continue
    const key = keyOf(one)
    if (key === null || !ts.isStringLiteral(one.initializer)) continue
    found.set(key, one.initializer)
  }
  return found
}

export function statedIn(source: ts.SourceFile): ReadonlyMap<string, ts.StringLiteral> {
  for (const statement of source.statements) {
    if (!ts.isVariableStatement(statement) || !exported(statement)) continue
    for (const one of statement.declarationList.declarations) {
      if (one.initializer === undefined) continue
      const held = literalOf(one.initializer)
      if (held !== null) return textsOf(held)
    }
  }
  return new Map()
}

function boundIn(source: ts.SourceFile): string | null {
  for (const statement of source.statements) {
    if (!ts.isVariableStatement(statement) || !exported(statement)) continue
    for (const one of statement.declarationList.declarations) {
      if (one.initializer === undefined || literalOf(one.initializer) === null) continue
      if (ts.isIdentifier(one.name)) return one.name.text
    }
  }
  return null
}

function readdressed(said: string, one: Renaming): string | null {
  if (said === one.was) return one.now
  return said === `${one.pageTypeSlug}/${one.was}` ? `${one.pageTypeSlug}/${one.now}` : null
}

function spotIn(source: ts.SourceFile, node: ts.Expression, one: Renaming): readonly Spot[] {
  if (!ts.isStringLiteral(node)) return []
  const next = readdressed(node.text, one)
  if (next === null) return []
  return [{ start: node.getStart(source), end: node.getEnd(), put: JSON.stringify(next) }]
}

function valuedIn(source: ts.SourceFile, node: ts.Expression, one: Renaming): readonly Spot[] {
  if (!ts.isArrayLiteralExpression(node)) return spotIn(source, node, one)
  return node.elements.flatMap((held) => spotIn(source, held, one))
}

export function addressedIn(
  path: string,
  text: string,
  slugs: ReadonlySet<string>,
  one: Renaming
): readonly Spot[] {
  const source = parsedAs(path, text)
  const found: Spot[] = []
  const walk = (node: ts.Node): undefined => {
    if (ts.isPropertyAssignment(node)) {
      const key = keyOf(node)
      if (key !== null && slugs.has(slugFor(key))) {
        found.push(...valuedIn(source, node.initializer, one))
      }
    }
    ts.forEachChild(node, walk)
  }
  ts.forEachChild(source, walk)
  return found
}

export function splicedIn(text: string, spots: readonly Spot[]): string {
  const seen = new Set<number>()
  let body = text
  for (const one of [...spots].sort((here, there) => there.start - here.start)) {
    if (seen.has(one.start)) continue
    seen.add(one.start)
    body = body.slice(0, one.start) + one.put + body.slice(one.end)
  }
  return body
}

function reachOf(root: string, id: string, pageTypeSlug: string): Reach {
  try {
    return { namers: namersOf(root, id), slugs: slugsOfType(root, pageTypeSlug) }
  } catch (cause) {
    const why = cause instanceof Error ? cause.message : String(cause)
    return { unread: `${why}, so no slug was restated` }
  }
}

function namingIn(namers: readonly Named[]): ReadonlyMap<string, ReadonlySet<string>> {
  const found = new Map<string, Set<string>>()
  for (const one of namers) {
    const held = found.get(one.path) ?? new Set<string>()
    held.add(one.propertySlug)
    found.set(one.path, held)
  }
  return found
}

export function renameSlug(
  root: string,
  given: Asked,
  textOf: (path: string) => string | null
): Renamed {
  if (!given.at.endsWith(TYPED)) return refusing(`\`${given.at}\` is no \`.ts\` file`)
  const text = textOf(given.at)
  if (text === null) return refusing(`\`${given.at}\` could not be read`)
  const source = parsedAs(given.at, text)
  const said = statedIn(source)
  const slug = said.get(SLUG)
  const pageType = said.get(PAGE_TYPE_SLUG)
  const id = said.get(ID)
  if (slug === undefined) return refusing(`\`${given.at}\` states no \`${SLUG}\``)
  if (pageType === undefined) return refusing(`\`${given.at}\` states no \`${PAGE_TYPE_SLUG}\``)
  if (id === undefined) return refusing(`\`${given.at}\` states no \`${ID}\``)
  const bound = exportedAs(slug.text)
  if (boundIn(source) !== bound) {
    return refusing(`\`${given.at}\` exports no \`${bound}\`, the name its slug makes`)
  }
  if (!KEBAB.test(given.to)) {
    return refusing(`\`${given.to}\` is no slug, a slug being lower kebab case`)
  }
  if (given.to === slug.text) return refusing(`\`${given.to}\` is the slug it already carries`)
  const reach = reachOf(root, id.text, pageType.text)
  if ("unread" in reach) return refusing(reach.unread)
  if (reach.slugs.includes(given.to)) {
    return refusing(`a \`${pageType.text}\` carries the slug \`${given.to}\` already`)
  }
  const one = { was: slug.text, now: given.to, pageTypeSlug: pageType.text }
  const texts = new Map<string, string>([[given.at, text]])
  const spots = new Map<string, Spot[]>()
  const put = (path: string, held: readonly Spot[]): undefined => {
    spots.set(path, [...(spots.get(path) ?? []), ...held])
  }
  put(given.at, [
    { start: slug.getStart(source), end: slug.getEnd(), put: JSON.stringify(given.to) },
  ])
  for (const [path, slugs] of namingIn(reach.namers)) {
    let body = texts.get(path)
    if (body === undefined) {
      const read = textOf(path)
      if (read === null) return refusing(`\`${path}\` names this page and could not be read`)
      texts.set(path, read)
      body = read
    }
    put(path, addressedIn(path, body, slugs, one))
  }
  const bodies = new Map<string, string>()
  for (const [path, held] of spots) {
    const body = texts.get(path) ?? ""
    const next = splicedIn(body, held)
    if (next !== body) bodies.set(path, next)
  }
  const reading = importingOf(root, new Map([[given.at, given.at]]))
  if ("unread" in reading) return refusing(reading.unread)
  const over = [given.at, ...reading.importers]
  const spelled = respelled(root, given.at, over, bound, exportedAs(given.to), (path) => {
    return bodies.get(path) ?? textOf(path)
  })
  if (spelled.bodies === null) return refusing(spelled.refused ?? `\`${bound}\` was not respelled`)
  for (const [path, body] of spelled.bodies) bodies.set(path, body)
  return { bodies, refused: null }
}
