import { existsSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs"
import { createRequire } from "node:module"
import { dirname, isAbsolute, join, relative } from "node:path"
import { specifiersIn } from "../../code-system/code-specifier/code-specifier.module.code.ts"
import { addressIn } from "../page/page-address/page-address.module.code.ts"
import { exportedAs } from "../page/page-export-name/page-export-name.module.code.ts"
import { besideAt } from "../page/page-file-name/page-file-name.module.code.ts"
import { slugFor } from "../page-property/page-property-key/page-property-key.module.code.ts"
import { indexIdentity } from "./index/index-identity/index-identity.index.ts"
import { indexImport } from "./index/index-import/index-import.index.ts"
import { indexPath } from "./index/index-path/index-path.index.ts"
import { indexSchema } from "./index/index-schema/index-schema.index.ts"
import { type Reading, readingOf } from "./index-surface.module.code.ts"

const ENDING = ".jsonl"

const IDENTITY = indexIdentity.indexName

const IMPORT = indexImport.indexName

const PATH = indexPath.indexName

const SCHEMA = indexSchema.indexName

const SCRATCH_AT = "/var/tmp"

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
  readonly pageTypeSlug: string
  readonly targetPageTypeSlug: string | null
  readonly unique: string | null
}

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

export function loadedFrom(body: string): Loaded {
  const held = mkdtempSync(join(SCRATCH_AT, "akasha-index-"))
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

export function pageTypesIn(given: string | Reading): ReadonlySet<string> {
  const dir = join(IDENTITY, "page-type", "slug")
  return new Set<string>([
    "page-type",
    ...readingOf(given)
      .listing(dir)
      .map((one) => one.name.slice(0, -ENDING.length)),
  ])
}

export function slugOf(named: string): string {
  const address = addressIn(named)
  return address.kind === "id" ? named : address.slug
}

export function under(repo: string, path: string): string {
  return isAbsolute(path) ? relative(repo, path) : path
}

export function textAt(value: Value, key: string): string | null {
  const held = value[key]
  return typeof held === "string" ? held : null
}

const TS = ".ts"

export function filePropertiesIn(values: Iterable<Value>): ReadonlySet<string> {
  const found = new Set<string>()
  for (const value of values) {
    if (textAt(value, "pageTypeSlug") !== "file-property") continue
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
  const found = [own]
  for (const [key, held] of Object.entries(value)) {
    if (typeof held !== "string") continue
    const propertySlug = slugFor(key)
    if (!fileProperties.has(propertySlug)) continue
    const beside = besideAt(own, propertySlug, held)
    if (beside !== null) found.push(beside)
  }
  return found
}

export function identityIn(
  value: Value,
  path: string,
  repo: string,
  unique: ReadonlyMap<string, string>
): readonly Entry[] {
  const id = textAt(value, "id")
  const slug = textAt(value, "slug")
  const pageTypeSlug = textAt(value, "pageTypeSlug")
  if (id === null || slug === null || pageTypeSlug === null) return []
  const line = JSON.stringify({ path: under(repo, path), id })
  const held: Entry[] = []
  for (const [named, reach] of unique) {
    const said = textAt(value, exportedAs(named))
    if (said === null) continue
    const scope = reach === ALWAYS ? PAGE : pageTypeSlug
    held.push({ at: join(IDENTITY, scope, named, `${said}.jsonl`), line })
  }
  return held
}

const ALWAYS = "always"

const PAGE = "page"

const PATH_AT = PATH

export function pathIn(
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
  return pathsOf(value, path, repo, fileProperties).map((one) => ({
    at: join(PATH_AT, `${one}.jsonl`),
    line,
  }))
}

const PROPERTY = "page-property"

const SHAPES = new Set([
  "text-property",
  "number-property",
  "boolean-property",
  "relation-property",
  "record-property",
  "file-property",
])

export function slugAt(value: Value, key: string): string | null {
  const named = textAt(value, key)
  return named === null ? null : slugOf(named)
}

export function schemaIn(value: Value): readonly Entry[] {
  const pageTypeSlug = textAt(value, "pageTypeSlug")
  if (pageTypeSlug === null || !SHAPES.has(pageTypeSlug)) return []
  const slug = textAt(value, "slug")
  if (slug === null) return []
  const held: Schema = {
    pageTypeSlug,
    targetPageTypeSlug: slugAt(value, "targetPageTypeSlug"),
    unique: slugAt(value, "unique"),
  }
  return [{ at: join(SCHEMA, PROPERTY, "slug", `${slug}.jsonl`), line: JSON.stringify(held) }]
}

const RELATIVE = /^\.\.?\//

const OUTSIDE = ".."

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
    found.push({ at: join(IMPORT, "path", `${landed}.jsonl`), line })
  }
  return found
}

export function schemaAt(given: string | Reading): ReadonlyMap<string, Schema> {
  const reading = readingOf(given)
  const dir = join(SCHEMA, PROPERTY, "slug")
  const found = new Map<string, Schema>()
  for (const one of reading.listing(dir)) {
    const line = reading.lines(join(dir, one.name))[0]
    if (line !== undefined) {
      found.set(one.name.slice(0, -ENDING.length), JSON.parse(line) as Schema)
    }
  }
  return found
}

export function filePropertiesAt(given: string | Reading): ReadonlySet<string> {
  const found = new Set<string>()
  for (const [slug, held] of schemaAt(given))
    if (held.pageTypeSlug === "file-property") found.add(slug)
  return found
}
