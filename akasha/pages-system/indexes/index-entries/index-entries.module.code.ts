import { mkdtempSync, readFileSync, rmSync, statSync, writeFileSync } from "node:fs"
import { createRequire } from "node:module"
import { dirname, isAbsolute, join, relative } from "node:path"
import { addressIn } from "../../page/page-address/page-address.module.code.ts"
import { besideAt } from "../../page/page-file-name/page-file-name.module.code.ts"
import { slugFor } from "../../page-property/page-property-key/page-property-key.module.code.ts"
import { indexIdentity } from "../index/index-identity/index-identity.index.ts"
import { indexSchema } from "../index/index-schema/index-schema.index.ts"
import { type Reading, readingOf } from "../index-surface/index-surface.module.code.ts"

const ENDING = ".jsonl"

const IDENTITY = indexIdentity.indexName

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
  const stood = statSync(at, { throwIfNoEntry: false })
  if (stood === undefined || !stood.isFile()) return null
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

const PROPERTY = "page-property"

export function slugAt(value: Value, key: string): string | null {
  const named = textAt(value, key)
  return named === null ? null : slugOf(named)
}

const RELATIVE = /^\.\.?\//

const OUTSIDE = ".."

export function importedBy(path: string, specifier: string): string | null {
  if (!RELATIVE.test(specifier)) return null
  const landed = join(dirname(path), specifier)
  return landed === OUTSIDE || landed.startsWith(`${OUTSIDE}/`) ? null : landed
}

export function schemaAt(given: string | Reading): ReadonlyMap<string, Schema> {
  const reading = readingOf(given)
  const dir = join(SCHEMA, PROPERTY, "slug")
  const found = new Map<string, Schema>()
  for (const one of reading.listing(dir)) {
    const line = reading.lines(join(dir, one.name))[0]
    if (line !== undefined) {
      const said = JSON.parse(line) as Partial<Schema>
      found.set(one.name.slice(0, -ENDING.length), {
        pageTypeSlug: said.pageTypeSlug ?? "",
        targetPageTypeSlug: said.targetPageTypeSlug ?? null,
        unique: said.unique ?? null,
      })
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

export function uniquePropertiesIn(values: Iterable<Value>): ReadonlyMap<string, string> {
  const found = new Map<string, string>()
  for (const value of values) {
    const reach = slugAt(value, "unique")
    const slug = textAt(value, "slug")
    if (reach !== null && slug !== null) found.set(slug, reach)
  }
  return found
}

export function uniquePropertiesAt(given: string | Reading): ReadonlyMap<string, string> {
  const found = new Map<string, string>()
  for (const [slug, held] of schemaAt(given)) {
    if (held.unique !== null) found.set(slug, held.unique)
  }
  return found
}
