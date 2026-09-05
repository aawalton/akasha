import { join } from "node:path"
import { typed } from "@akasha/code-system/code-typing"
import { addressIn } from "@akasha/pages-system/page-address"
import { partedIn } from "@akasha/pages-system/page-file-name"
import type { Value } from "@akasha/pages-system/page-value"
import { indexIdentity } from "../identity/index-identity.index.ts"
import { indexImport } from "../import/index-import.index.ts"
import { indexValue } from "../index/value/index-value.index.ts"
import type { Reading } from "../index-shape/index-shape.module.code.ts"
import { staleFor } from "../index-stamp/index-stamp.module.code.ts"
import {
  beneath,
  INDEX_AT,
  indexAt,
  indexIn,
  readingOf,
} from "../index-surface/index-surface.module.code.ts"
import { indexPath } from "../path/index-path.index.ts"
import { indexRelation } from "../relation/index-relation.index.ts"
import { indexSchema } from "../schema/index-schema.index.ts"

export type Listed = {
  readonly path: string
  readonly id: string
}

export type Schema = {
  readonly pageTypeSlug: string
  readonly targetPageTypeSlug: string | null
  readonly unique: string | null
  readonly slug: string | null
  readonly propertySlug: string | null
  readonly fileName: string | null
}

const IDENTITY = indexIdentity.name

const IMPORT = indexImport.name

const PATH = indexPath.name

const RELATION = indexRelation.name

const SCHEMA = indexSchema.name

const VALUE = indexValue.name

const PROPERTY = "page-property"

const ENDING = ".jsonl"

const SLUG = "slug"

const PAGE = "page"

const ID = "id"

const AT_PATH = "path"

const ROOT = ""

const NAMING_NONE = "an index that is missing is not an index naming none"

export function indexNamed(): string {
  return INDEX_AT
}

export function indexThere(given: string | Reading): boolean {
  return readingIn(given).holds("")
}

export function readingIn(given: string | Reading): Reading {
  return readingOf(typeof given === "string" ? indexIn(given) : given)
}

export function answered<T>(
  given: string | Reading,
  at: string,
  asked: string,
  said: (reading: Reading) => T
): T {
  const reading = readingIn(given)
  if (!reading.holds(at)) {
    throw new Error(
      `\`${indexAt(at)}\` is not there, so ${asked} could not be answered — ${NAMING_NONE}`
    )
  }
  return said(reading)
}

function named(said: unknown): string | null {
  return typeof said === "string" ? said : null
}

function listedIn(reading: Reading, at: string): readonly Listed[] {
  const found: Listed[] = []
  for (const line of reading.lines(at)) {
    const said = JSON.parse(line) as { readonly path?: unknown; readonly id?: unknown }
    if (typeof said.path === "string" && typeof said.id === "string") {
      found.push({ path: said.path, id: said.id })
    }
  }
  return found
}

function endingIn(said: readonly { readonly name: string }[]): readonly string[] {
  return said
    .map((one) => one.name)
    .filter((one) => one.endsWith(ENDING))
    .map((one) => one.slice(0, -ENDING.length))
    .sort()
}

export function listedNamed(
  given: string | Reading,
  scope: string,
  propertySlug: string,
  said: string
): readonly Listed[] {
  return answered(
    given,
    ROOT,
    `which \`${scope}\` carries \`${said}\` as its \`${propertySlug}\``,
    (reading) => listedIn(reading, join(IDENTITY, scope, propertySlug, `${said}${ENDING}`))
  )
}

export function listedAt(
  given: string | Reading,
  pageTypeSlug: string,
  slug: string
): readonly Listed[] {
  return listedNamed(given, pageTypeSlug, SLUG, slug)
}

export function listedById(given: string | Reading, id: string): Listed | null {
  return answered(
    given,
    ROOT,
    `which page carries \`${id}\``,
    (reading) => listedIn(reading, join(IDENTITY, PAGE, ID, `${id}${ENDING}`))[0] ?? null
  )
}

export function listedAddressed(
  given: string | Reading,
  named: string,
  unqualified: string
): Listed | null {
  const address = addressIn(named)
  if (address.kind === "id") return listedById(given, address.id)
  const under = address.kind === "qualified" ? address.pageTypeSlug : unqualified
  return listedAt(given, under, address.slug)[0] ?? null
}

export function listedByPath(given: string | Reading, path: string): readonly Listed[] {
  return answered(given, ROOT, `what names \`${path}\``, (reading) =>
    listedIn(reading, join(PATH, `${path}${ENDING}`))
  )
}

function pathsIn(reading: Reading, at: string): readonly string[] {
  const found: string[] = []
  for (const line of reading.lines(at)) {
    const said = JSON.parse(line) as { readonly path?: unknown }
    if (typeof said.path === "string") found.push(said.path)
  }
  return found.sort()
}

export function importersIn(given: string | Reading, path: string): readonly string[] {
  return pathsIn(readingOf(given), join(IMPORT, AT_PATH, `${path}${ENDING}`))
}

export function importersOf(
  root: string | null,
  path: string,
  reading: Reading
): readonly string[] {
  const asked = `which files import \`${path}\``
  const why = root === null ? null : staleFor(root, indexIn(root), typed)
  if (why !== null) throw new Error(`${asked} could not be answered — ${why}`)
  const under = join(IMPORT, AT_PATH)
  return answered(reading, under, asked, (held) => importersIn(held, path))
}

function schemaIn(reading: Reading, at: string): readonly Schema[] {
  const found: Schema[] = []
  for (const line of reading.lines(at)) {
    const said = JSON.parse(line) as Record<string, unknown>
    const pageTypeSlug = named(said["pageTypeSlug"])
    if (pageTypeSlug === null) continue
    found.push({
      pageTypeSlug,
      targetPageTypeSlug: named(said["targetPageTypeSlug"]),
      unique: named(said["unique"]),
      slug: named(said["slug"]),
      propertySlug: named(said["propertySlug"]),
      fileName: named(said["fileName"]),
    })
  }
  return found
}

export type Schemad = { readonly schema: Schema } | { readonly refused: string }

const SCHEMA_UNDER = join(SCHEMA, PROPERTY)

function filedAt(reading: Reading, pageTypeSlug: string, slug: string): Schema | null {
  return schemaIn(reading, join(SCHEMA_UNDER, pageTypeSlug, SLUG, `${slug}${ENDING}`))[0] ?? null
}

function carriesNo(slug: string): string {
  return `no page property carries the slug \`${slug}\``
}

function among(slug: string, named: readonly string[]): string {
  return (
    `\`${slug}\` narrows to ${named.length} page properties and must name its page type — ` +
    [...named].sort().join(", ")
  )
}

function shapedIn(reading: Reading, named: string): Schemad {
  const address = addressIn(named)
  if (address.kind === "qualified") {
    const one = filedAt(reading, address.pageTypeSlug, address.slug)
    return one === null ? { refused: carriesNo(address.slug) } : { schema: one }
  }
  const slug = address.kind === "id" ? address.id : address.slug
  const found: Schema[] = []
  const qualified: string[] = []
  for (const shape of reading.listing(SCHEMA_UNDER)) {
    if (!shape.directory) continue
    const held = filedAt(reading, shape.name, slug)
    if (held === null) continue
    found.push(held)
    qualified.push(`${shape.name}/${slug}`)
  }
  const one = found[0]
  if (found.length === 1 && one !== undefined) return { schema: one }
  return { refused: found.length === 0 ? carriesNo(slug) : among(slug, qualified) }
}

export function schemaOf(given: string | Reading, named: string): Schemad {
  return answered(given, ROOT, `what shape \`${named}\` has`, (reading) => shapedIn(reading, named))
}

function byPath(one: Listed, two: Listed): number {
  return one.path < two.path ? -1 : one.path > two.path ? 1 : 0
}

function gatheredIn(reading: Reading, dir: string): readonly Listed[] {
  const found: Listed[] = []
  for (const one of reading.listing(dir)) {
    if (!one.name.endsWith(ENDING)) continue
    found.push(...listedIn(reading, join(dir, one.name)))
  }
  return [...found].sort(byPath)
}

export function everyOfType(given: string | Reading, pageTypeSlug: string): readonly Listed[] {
  return answered(given, ROOT, `which \`${pageTypeSlug}\` pages stand`, (reading) =>
    gatheredIn(reading, join(IDENTITY, pageTypeSlug, SLUG))
  )
}

export type Valued = {
  readonly path: string
  readonly value: Value
}

function valuesIn(reading: Reading, at: string): readonly Valued[] {
  const found: Valued[] = []
  for (const line of reading.lines(at)) {
    let said: unknown
    try {
      said = JSON.parse(line)
    } catch {
      continue
    }
    if (said === null || typeof said !== "object" || Array.isArray(said)) continue
    const held = said as Record<string, unknown>
    const path = held.path
    const value = held.value
    if (typeof path !== "string") continue
    if (value === null || typeof value !== "object" || Array.isArray(value)) continue
    found.push({ path, value: value as Value })
  }
  return found
}

export function everyValue(given: string | Reading): ReadonlyMap<string, Value> {
  return answered(given, ROOT, "what every page carries", (reading) => {
    const found = new Map<string, Value>()
    for (const one of reading.listing(VALUE)) {
      if (one.directory || !one.name.endsWith(ENDING)) continue
      for (const held of valuesIn(reading, join(VALUE, one.name))) found.set(held.path, held.value)
    }
    return found
  })
}

export function valuesOfType(given: string | Reading, pageTypeSlug: string): readonly Valued[] {
  return answered(given, ROOT, `what the \`${pageTypeSlug}\` pages carry`, (reading) =>
    [...valuesIn(reading, join(VALUE, `${pageTypeSlug}${ENDING}`))].sort((one, two) =>
      one.path < two.path ? -1 : one.path > two.path ? 1 : 0
    )
  )
}

export function slugsOfType(given: string | Reading, pageTypeSlug: string): readonly string[] {
  return answered(given, ROOT, `which \`${pageTypeSlug}\` slugs stand`, (reading) =>
    endingIn(reading.listing(join(IDENTITY, pageTypeSlug, SLUG)))
  )
}

export function idsNaming(
  given: string | Reading,
  id: string,
  propertySlug: string
): readonly string[] {
  return answered(
    given,
    ROOT,
    `which pages name \`${id}\` as their \`${propertySlug}\``,
    (reading) => endingIn(reading.listing(join(RELATION, PAGE, ID, id, propertySlug)))
  )
}

function underneath(reading: Reading, at: string, said: string): readonly string[] {
  return reading.listing(at).flatMap((one) => {
    const held = `${said}${one.name}`
    if (one.directory) return underneath(reading, beneath(at, one.name), `${held}/`)
    return one.name.endsWith(ENDING) ? [held.slice(0, -ENDING.length)] : []
  })
}

export function everyPath(given: string | Reading): readonly string[] {
  return answered(given, ROOT, "which files stand", (reading) =>
    [...underneath(reading, PATH, "")].sort()
  )
}

function slugOf(standing: Listed | null, id: string): string | null {
  if (standing === null) return null
  const said = partedIn(standing.path)
  if (said === null) {
    throw new Error(
      `\`${standing.path}\` carries the id \`${id}\`, and its name says no slug for the page type it is`
    )
  }
  return said.slug
}

export function typeSlugById(given: string | Reading, id: string): string | null {
  return slugOf(listedById(given, id), id)
}

export function typeSlugOf(given: string | Reading, id: string): string {
  const said = typeSlugById(given, id)
  if (said === null) {
    throw new Error(`no page carries the id \`${id}\`, so nothing says which pages are of its type`)
  }
  return said
}

export type Named = {
  readonly path: string
  readonly propertySlug: string
}

export function namersOf(
  given: string | Reading,
  id: string,
  indexName: string = RELATION
): readonly Named[] {
  return answered(given, ROOT, `which pages name \`${id}\``, (reading) => {
    const dir = join(indexName, PAGE, ID, id)
    const found: Named[] = []
    for (const property of reading.listing(dir)) {
      if (!property.directory) continue
      const at = beneath(dir, property.name)
      for (const one of reading.listing(at)) {
        for (const line of reading.lines(beneath(at, one.name))) {
          const said = JSON.parse(line) as { readonly path?: unknown }
          if (typeof said.path !== "string") continue
          found.push({ path: said.path, propertySlug: property.name })
        }
      }
    }
    return found
  })
}
