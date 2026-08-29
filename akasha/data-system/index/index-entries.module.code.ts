import { createRequire } from "node:module"
import { existsSync, mkdtempSync, readFileSync, readdirSync, rmSync, writeFileSync } from "node:fs"
import { dirname, isAbsolute, join, relative } from "node:path"
import { tmpdir } from "node:os"
import ts from "typescript"
import { addressIn } from "../../pages-system/page/page-address.module.code.ts"

const loadFrom = createRequire(import.meta.url)

export type Value = Record<string, unknown>

export type Entry = {
  readonly at: string
  readonly line: string
}

export type Standing = {
  readonly path: string
  readonly id: string
}

export type Schema = {
  readonly kind: string
  readonly targetPageTypeSlug: string | null
  readonly entrySlug: string | null
}

const NOT_A_RELATION = new Set(["id", "slug", "pageTypeSlug"])

function firstValueIn(declared: Record<string, unknown>): Value | null {
  for (const one of Object.values(declared)) {
    if (one !== null && typeof one === "object" && !Array.isArray(one)) return one as Value
  }
  return null
}

export type Loaded = {
  readonly value: Value | null
  readonly failed: string | null
}

export const NAMED = /^(.+)\.([a-z0-9-]+)\.ts$/

export function loadedFrom(body: string): Loaded {
  const held = mkdtempSync(join(tmpdir(), "akasha-index-"))
  try {
    const at = join(held, "held.page.ts")
    writeFileSync(at, body)
    return { value: firstValueIn(loadFrom(at) as Record<string, unknown>), failed: null }
  } catch (why) {
    return { value: null, failed: why instanceof Error ? why.message : String(why) }
  } finally {
    rmSync(held, { recursive: true, force: true })
  }
}

export function valueIn(body: string): Value | null {
  return loadedFrom(body).value
}

export function valueAt(path: string, repo: string): Value | null {
  const at = isAbsolute(path) ? path : join(repo, path)
  if (!existsSync(at)) return null
  return loadedFrom(readFileSync(at, "utf8")).value
}

export function pageTypesIn(root: string): ReadonlySet<string> {
  const dir = join(root, "identity", "page-type", "slug")
  if (!existsSync(dir)) return new Set<string>(["page-type"])
  return new Set<string>([
    "page-type",
    ...readdirSync(dir).map((one) => one.slice(0, -".jsonl".length)),
  ])
}

export function pageTyped(path: string, pageTypes: ReadonlySet<string>): boolean {
  const said = NAMED.exec(path.slice(path.lastIndexOf("/") + 1))
  return said !== null && said[2] !== undefined && pageTypes.has(said[2])
}

function slugOf(named: string): string {
  const address = addressIn(named)
  return address.kind === "id" ? named : address.slug
}

function under(repo: string, path: string): string {
  return isAbsolute(path) ? relative(repo, path) : path
}

function textAt(value: Value, key: string): string | null {
  const held = value[key]
  return typeof held === "string" ? held : null
}

function kebab(key: string): string {
  return key.replace(/[A-Z]/g, (one) => `-${one.toLowerCase()}`)
}

const TS = ".ts"

export function filePropertiesIn(values: Iterable<Value>): ReadonlySet<string> {
  const found = new Set<string>()
  for (const value of values) {
    if (textAt(value, "pageTypeSlug") !== "page-property-type") continue
    if (textAt(value, "kind") !== "file") continue
    const slug = textAt(value, "slug")
    if (slug !== null) found.add(slug)
  }
  return found
}

export function pathsOf(
  value: Value,
  path: string,
  repo: string,
  fileProperties: ReadonlySet<string>
): readonly string[] {
  const own = under(repo, path)
  if (!own.endsWith(TS)) return [own]
  const stem = own.slice(0, -TS.length)
  const found = [own]
  for (const [key, held] of Object.entries(value)) {
    if (typeof held !== "string") continue
    const propertySlug = kebab(key)
    if (fileProperties.has(propertySlug)) found.push(`${stem}.${propertySlug}.${held}`)
  }
  return found
}

export function identityIn(
  value: Value,
  path: string,
  repo: string,
  fileProperties: ReadonlySet<string>
): readonly Entry[] {
  const id = textAt(value, "id")
  const slug = textAt(value, "slug")
  const pageTypeSlug = textAt(value, "pageTypeSlug")
  if (id === null || slug === null || pageTypeSlug === null) return []
  const line = JSON.stringify({ path: under(repo, path), id })
  return [
    { at: join("identity", "page", "id", `${id}.jsonl`), line },
    { at: join("identity", pageTypeSlug, "slug", `${slug}.jsonl`), line },
    ...pathsOf(value, path, repo, fileProperties).map((one) => ({
      at: join("identity", "page", "path", `${one}.jsonl`),
      line,
    })),
  ]
}

const PROPERTY = "page-property-type"

function slugAt(value: Value, key: string): string | null {
  const named = textAt(value, key)
  return named === null ? null : slugOf(named)
}

export function schemaIn(value: Value): readonly Entry[] {
  if (textAt(value, "pageTypeSlug") !== PROPERTY) return []
  const slug = textAt(value, "slug")
  const kind = textAt(value, "kind")
  if (slug === null || kind === null) return []
  const held: Schema = {
    kind,
    targetPageTypeSlug: slugAt(value, "targetPageTypeSlug"),
    entrySlug: slugAt(value, "entrySlug"),
  }
  return [{ at: join("schema", PROPERTY, "slug", `${slug}.jsonl`), line: JSON.stringify(held) }]
}

const RELATIVE = /^\.\.?\//

const OUTSIDE = ".."

export function specifiersIn(at: string, text: string): readonly string[] {
  const source = ts.createSourceFile(at, text, ts.ScriptTarget.Latest, false, ts.ScriptKind.TS)
  const found: string[] = []
  const held = (node: ts.Node): void => {
    if (
      (ts.isImportDeclaration(node) || ts.isExportDeclaration(node)) &&
      node.moduleSpecifier !== undefined &&
      ts.isStringLiteral(node.moduleSpecifier)
    ) {
      found.push(node.moduleSpecifier.text)
    }
    if (
      ts.isCallExpression(node) &&
      (node.expression.kind === ts.SyntaxKind.ImportKeyword ||
        (ts.isIdentifier(node.expression) && node.expression.text === "require"))
    ) {
      const one = node.arguments[0]
      if (one !== undefined && ts.isStringLiteral(one)) found.push(one.text)
    }
    if (ts.isExternalModuleReference(node) && ts.isStringLiteral(node.expression)) {
      found.push(node.expression.text)
    }
    if (ts.isImportTypeNode(node) && ts.isLiteralTypeNode(node.argument)) {
      const one = node.argument.literal
      if (ts.isStringLiteral(one)) found.push(one.text)
    }
    ts.forEachChild(node, held)
  }
  ts.forEachChild(source, held)
  return found
}

export function importedBy(path: string, specifier: string): string | null {
  if (!RELATIVE.test(specifier)) return null
  const landed = join(dirname(path), specifier)
  return landed === OUTSIDE || landed.startsWith(`${OUTSIDE}/`) ? null : landed
}

export function importIn(body: string, path: string, repo: string): readonly Entry[] {
  const own = under(repo, path)
  if (!own.endsWith(TS)) return []
  const line = JSON.stringify({ path: own })
  const found: Entry[] = []
  for (const one of specifiersIn(own, body)) {
    const landed = importedBy(own, one)
    if (landed === null) continue
    found.push({ at: join("import", "path", `${landed}.jsonl`), line })
  }
  return found
}

export function linesIn(at: string): readonly string[] {
  if (!existsSync(at)) return []
  return readFileSync(at, "utf8")
    .split("\n")
    .filter((one) => one !== "")
}

function standingIn(at: string): readonly Standing[] {
  return linesIn(at).map((one) => JSON.parse(one) as Standing)
}

export type Known = {
  readonly targetOf: (propertySlug: string) => string | null
  readonly admitting: (target: string) => readonly string[]
  readonly at: (pageTypeSlug: string, slug: string) => readonly Standing[]
  readonly byId: (id: string) => Standing | null
}

function everyPageOf(root: string, pageTypeSlug: string): readonly Standing[] {
  const dir = join(root, "identity", pageTypeSlug, "slug")
  if (!existsSync(dir)) return []
  const found: Standing[] = []
  for (const one of readdirSync(dir)) found.push(...standingIn(join(dir, one)))
  return found
}

export function schemaAt(root: string): ReadonlyMap<string, Schema> {
  const dir = join(root, "schema", PROPERTY, "slug")
  if (!existsSync(dir)) return new Map<string, Schema>()
  const found = new Map<string, Schema>()
  for (const one of readdirSync(dir)) {
    const line = linesIn(join(dir, one))[0]
    if (line !== undefined) found.set(one.slice(0, -".jsonl".length), JSON.parse(line) as Schema)
  }
  return found
}

export function filePropertiesAt(root: string): ReadonlySet<string> {
  const found = new Set<string>()
  for (const [slug, held] of schemaAt(root)) if (held.kind === "file") found.add(slug)
  return found
}

export function knownIn(root: string, repo: string): Known {
  const target = new Map<string, string>()
  const entry = new Map<string, string>()
  for (const [slug, held] of schemaAt(root)) {
    const named = held.kind === "relation" ? held.targetPageTypeSlug : null
    if (named !== null) target.set(slug, named)
    const entered = held.kind === "list" ? held.entrySlug : null
    if (entered !== null) entry.set(slug, entered)
  }

  const above = new Map<string, string>()
  for (const one of everyPageOf(root, "page-type")) {
    const value = valueAt(one.path, repo)
    if (value === null) continue
    const slug = textAt(value, "slug")
    const extendsSlug = textAt(value, "extendsSlug")
    if (slug !== null && extendsSlug !== null) above.set(slug, slugOf(extendsSlug))
  }
  const everyType = new Set<string>([...above.keys(), ...above.values()])

  const targetOf = (propertySlug: string): string | null => {
    const walked = new Set<string>()
    let here: string | undefined = propertySlug
    while (here !== undefined && !walked.has(here)) {
      walked.add(here)
      const named = target.get(here)
      if (named !== undefined) return named
      here = entry.get(here)
    }
    return null
  }

  const admitting = (wanted: string): readonly string[] => {
    const found: string[] = []
    for (const one of everyType) {
      const walked = new Set<string>()
      let here: string | undefined = one
      while (here !== undefined && !walked.has(here)) {
        if (here === wanted) {
          found.push(one)
          break
        }
        walked.add(here)
        here = above.get(here)
      }
    }
    return found
  }

  return {
    targetOf,
    admitting,
    at: (pageTypeSlug, slug) => standingIn(join(root, "identity", pageTypeSlug, "slug", `${slug}.jsonl`)),
    byId: (id) => standingIn(join(root, "identity", "page", "id", `${id}.jsonl`))[0] ?? null,
  }
}

export type Reached = { readonly id: string } | { readonly refused: string }

function only(found: readonly Standing[]): Standing | null {
  const one = found[0]
  return found.length === 1 && one !== undefined ? one : null
}

function among(named: string, found: readonly Standing[]): string {
  return `\`${named}\` narrows to ${found.length} pages and must name its page type — ${found
    .map((one) => one.path)
    .join(", ")}`
}

export function reaches(named: string, wanted: string | null, known: Known): Reached {
  const address = addressIn(named)
  if (address.kind === "id") {
    return known.byId(address.id) === null
      ? { refused: `no page carries the id \`${address.id}\`` }
      : { id: address.id }
  }
  if (address.kind === "qualified") {
    const { pageTypeSlug, slug } = address
    const found = known.at(pageTypeSlug, slug)
    const one = only(found)
    if (one !== null) return { id: one.id }
    if (found.length === 0) return { refused: `no \`${pageTypeSlug}\` carries the slug \`${slug}\`` }
    return { refused: among(named, found) }
  }
  if (wanted === null) {
    return { refused: `\`${named}\` names no page type and its property declares no target` }
  }
  const found = known.admitting(wanted).flatMap((pageTypeSlug) => known.at(pageTypeSlug, address.slug))
  const one = only(found)
  if (one !== null) return { id: one.id }
  if (found.length === 0) return { refused: `no page admitting \`${wanted}\` carries the slug \`${named}\`` }
  return { refused: among(named, found) }
}

function namesIn(held: unknown): readonly string[] {
  if (typeof held === "string") return [held]
  if (!Array.isArray(held)) return []
  return held.filter((one): one is string => typeof one === "string")
}

export type Filed = {
  readonly entries: readonly Entry[]
  readonly refused: readonly string[]
}

export const NOTHING_FILED: Filed = { entries: [], refused: [] }

export function relationIn(value: Value, path: string, known: Known, repo: string): Filed {
  const id = textAt(value, "id")
  if (id === null) return NOTHING_FILED
  const line = JSON.stringify({ path: under(repo, path) })
  const entries: Entry[] = []
  const refused: string[] = []
  for (const [key, held] of Object.entries(value)) {
    if (NOT_A_RELATION.has(key) || held === null) continue
    const propertySlug = kebab(key)
    const wanted = known.targetOf(propertySlug)
    if (wanted === null) continue
    for (const named of namesIn(held)) {
      const reached = reaches(named, wanted, known)
      if ("refused" in reached) {
        refused.push(`${path}: \`${propertySlug}\` — ${reached.refused}`)
        continue
      }
      entries.push({
        at: join("relation", "page", "id", reached.id, propertySlug, `${id}.jsonl`),
        line,
      })
    }
  }
  return { entries, refused }
}
