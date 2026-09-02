import { dirname, isAbsolute, join, relative } from "node:path"
import { exportedAs } from "@akasha/pages-system/page-export-name"
import { besideAt, secretAt } from "@akasha/pages-system/page-file-name"
import { slugFor } from "@akasha/pages-system/page-property-key"
import { slugAt, textAt, type Value } from "@akasha/pages-system/page-value"
import { indexIdentity } from "../index/index-identity/index-identity.index.ts"
import { indexSchema } from "../index/index-schema/index-schema.index.ts"
import { answered, readingIn } from "../index-reading/index-reading.module.code.ts"
import type { Reading } from "../index-shape/index-shape.module.code.ts"

const ENDING = ".jsonl"

const IDENTITY = indexIdentity.name

const SCHEMA = indexSchema.name

export type Entry = {
  readonly at: string
  readonly line: string
}

export type Schema = {
  readonly pageTypeSlug: string
  readonly targetPageTypeSlug: string | null
  readonly unique: string | null
  readonly slug: string
  readonly propertySlug: string
  readonly fileName: string | null
}

export function pageTypesIn(given: string | Reading): ReadonlySet<string> {
  const dir = join(IDENTITY, "page-type", "slug")
  return new Set<string>([
    "page-type",
    ...readingIn(given)
      .listing(dir)
      .map((one) => one.name.slice(0, -ENDING.length)),
  ])
}

export function under(repo: string, path: string): string {
  return isAbsolute(path) ? relative(repo, path) : path
}

const FILE_PROPERTY = "file-property"

export const ENTRY_PROPERTY = "page-property-entry"

function besides(pageTypeSlug: string | null): boolean {
  return pageTypeSlug === FILE_PROPERTY || pageTypeSlug === ENTRY_PROPERTY
}

export function filePropertiesIn(values: Iterable<Value>): ReadonlyMap<string, string | null> {
  const found = new Map<string, string | null>()
  for (const value of values) {
    const key = textAt(value, "propertySlug")
    if (key === null) continue
    const fileName = textAt(value, "fileName")
    if (fileName !== null) {
      found.set(key, fileName)
      continue
    }
    if (besides(textAt(value, "pageTypeSlug"))) found.set(key, null)
  }
  return found
}

export function pathsOf(
  value: Value,
  path: string,
  repo: string,
  fileProperties: ReadonlyMap<string, string | null>
): readonly string[] {
  const own = under(repo, path)
  const found = [own]
  for (const [key, held] of Object.entries(value)) {
    if (typeof held !== "string") continue
    const propertySlug = slugFor(key)
    if (!fileProperties.has(propertySlug)) continue
    const fileName = fileProperties.get(propertySlug) ?? null
    if (fileName !== null) {
      found.push(join(dirname(own), fileName))
      continue
    }
    const beside = besideAt(own, propertySlug, held)
    if (beside !== null) found.push(beside)
  }
  return found
}

export function claimsOf(
  value: Value,
  path: string,
  repo: string,
  fileProperties: ReadonlyMap<string, string | null>
): readonly string[] {
  const found = [...pathsOf(value, path, repo, fileProperties)]
  const secret = secretAt(under(repo, path))
  if (secret !== null) found.push(secret)
  return found
}

const PROPERTY = "page-property"

const SLUG = "slug"

const SCHEMA_UNDER = join(SCHEMA, PROPERTY)

export function schemaAt(given: string | Reading): ReadonlyMap<string, Schema> {
  const reading = readingIn(given)
  const found = new Map<string, Schema>()
  for (const shape of reading.listing(SCHEMA_UNDER)) {
    if (!shape.directory) continue
    const dir = join(SCHEMA_UNDER, shape.name, SLUG)
    for (const one of reading.listing(dir)) {
      const line = reading.lines(join(dir, one.name))[0]
      if (line === undefined) continue
      const said: unknown = JSON.parse(line)
      if (said === null || typeof said !== "object" || Array.isArray(said)) continue
      const held = said as Value
      const pageTypeSlug = textAt(held, "pageTypeSlug") ?? ""
      const slug = textAt(held, "slug") ?? ""
      found.set(`${pageTypeSlug}/${slug}`, {
        pageTypeSlug,
        targetPageTypeSlug: textAt(held, "targetPageTypeSlug"),
        unique: textAt(held, "unique"),
        slug,
        propertySlug: textAt(held, "propertySlug") ?? "",
        fileName: textAt(held, "fileName"),
      })
    }
  }
  return found
}

export function filePropertiesAt(given: string | Reading): ReadonlyMap<string, string | null> {
  return answered(given, "", "which properties are held in a file", (reading) => {
    const found = new Map<string, string | null>()
    for (const held of schemaAt(reading).values()) {
      if (held.fileName !== null) found.set(held.propertySlug, held.fileName)
      else if (besides(held.pageTypeSlug)) found.set(held.propertySlug, null)
    }
    return found
  })
}

export function entryShapesAt(given: string | Reading): ReadonlySet<string> {
  const found = new Set<string>()
  for (const held of schemaAt(given).values()) {
    if (held.pageTypeSlug === ENTRY_PROPERTY) found.add(held.slug)
  }
  return found
}

export type Identifier = {
  readonly key: string
  readonly reach: string
}

export function uniquePropertiesIn(values: Iterable<Value>): ReadonlyMap<string, Identifier> {
  const found = new Map<string, Identifier>()
  for (const value of values) {
    const reach = slugAt(value, "unique")
    const slug = textAt(value, "slug")
    const propertySlug = textAt(value, "propertySlug")
    if (reach === null || slug === null || propertySlug === null) continue
    found.set(slug, { key: exportedAs(propertySlug), reach })
  }
  return found
}

export function uniquePropertiesAt(given: string | Reading): ReadonlyMap<string, Identifier> {
  const found = new Map<string, Identifier>()
  for (const held of schemaAt(given).values()) {
    if (held.unique === null || held.propertySlug === "") continue
    found.set(held.slug, { key: exportedAs(held.propertySlug), reach: held.unique })
  }
  return found
}
