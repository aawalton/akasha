import { join } from "node:path"
import { indexIdentity } from "../index/index-identity/index-identity.index.ts"
import { indexImport } from "../index/index-import/index-import.index.ts"
import { indexPath } from "../index/index-path/index-path.index.ts"
import { indexRelation } from "../index/index-relation/index-relation.index.ts"
import { indexSchema } from "../index/index-schema/index-schema.index.ts"
import { staleFor } from "../index-stamp/index-stamp.module.code.ts"
import {
  beneath,
  type Reading,
  readingAt,
  readingOf,
} from "../index-surface/index-surface.module.code.ts"

export type Standing = {
  readonly path: string
  readonly id: string
}

export type Schema = {
  readonly pageTypeSlug: string
  readonly targetPageTypeSlug: string | null
}

const INDEX_AT = ".git/data/index"

const IDENTITY = indexIdentity.indexName

const IMPORT = indexImport.indexName

const PATH = indexPath.indexName

const RELATION = indexRelation.indexName

const SCHEMA = indexSchema.indexName

const PROPERTY = "page-property"

const ENDING = ".jsonl"

const SLUG = "slug"

const PAGE = "page"

const ID = "id"

const AT_PATH = "path"

const NAMING_NONE = "an index that is missing is not an index naming no importer"

export function indexIn(root: string): string {
  return join(root, INDEX_AT)
}

export function indexAt(indexName: string, ...parts: readonly string[]): string {
  return join(INDEX_AT, indexName, ...parts)
}

export function identityAt(...parts: readonly string[]): string {
  return indexAt(IDENTITY, ...parts)
}

export function importAt(...parts: readonly string[]): string {
  return indexAt(IMPORT, ...parts)
}

export function pathAt(...parts: readonly string[]): string {
  return indexAt(PATH, ...parts)
}

export function relationAt(...parts: readonly string[]): string {
  return indexAt(RELATION, ...parts)
}

function overIndex(given: string | Reading): Reading {
  return readingOf(typeof given === "string" ? indexIn(given) : given)
}

function named(said: unknown): string | null {
  return typeof said === "string" ? said : null
}

function standingIn(reading: Reading, at: string): readonly Standing[] {
  const found: Standing[] = []
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

export function standingNamed(
  given: string | Reading,
  scope: string,
  propertySlug: string,
  said: string
): readonly Standing[] {
  return standingIn(overIndex(given), join(IDENTITY, scope, propertySlug, `${said}${ENDING}`))
}

export function standingAt(
  given: string | Reading,
  pageTypeSlug: string,
  slug: string
): readonly Standing[] {
  return standingNamed(given, pageTypeSlug, SLUG, slug)
}

export function standingById(given: string | Reading, id: string): Standing | null {
  return standingNamed(given, PAGE, ID, id)[0] ?? null
}

export function standingByPath(given: string | Reading, path: string): readonly Standing[] {
  return standingIn(overIndex(given), join(PATH, `${path}${ENDING}`))
}

function pathsIn(reading: Reading, at: string): readonly string[] {
  const found: string[] = []
  for (const line of reading.lines(at)) {
    const said = JSON.parse(line) as { readonly path?: unknown }
    if (typeof said.path === "string") found.push(said.path)
  }
  return found.sort()
}

export function importersOf(
  root: string,
  path: string,
  reading: Reading = readingAt(indexIn(root))
): readonly string[] {
  const asked = `which files import \`${path}\` could not be answered`
  const why = staleFor(root, indexIn(root))
  if (why !== null) throw new Error(`${asked} — ${why}`)
  const under = join(IMPORT, AT_PATH)
  if (!reading.holds(under)) {
    throw new Error(`\`${indexAt(IMPORT, AT_PATH)}\` is not there, so ${asked} — ${NAMING_NONE}`)
  }
  return pathsIn(reading, join(under, `${path}${ENDING}`))
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
    })
  }
  return found
}

export function schemaOf(given: string | Reading, propertySlug: string): Schema | null {
  const at = join(SCHEMA, PROPERTY, SLUG, `${propertySlug}${ENDING}`)
  return schemaIn(overIndex(given), at)[0] ?? null
}

function byPath(one: Standing, two: Standing): number {
  return one.path < two.path ? -1 : one.path > two.path ? 1 : 0
}

function gatheredIn(reading: Reading, dir: string): readonly Standing[] {
  const found: Standing[] = []
  for (const one of reading.listing(dir)) {
    if (!one.name.endsWith(ENDING)) continue
    found.push(...standingIn(reading, join(dir, one.name)))
  }
  return [...found].sort(byPath)
}

export function everyOfType(given: string | Reading, pageTypeSlug: string): readonly Standing[] {
  const reading = overIndex(given)
  return gatheredIn(reading, join(IDENTITY, pageTypeSlug, SLUG))
}

export function slugsOfType(given: string | Reading, pageTypeSlug: string): readonly string[] {
  return endingIn(overIndex(given).listing(join(IDENTITY, pageTypeSlug, SLUG)))
}

export function idsNaming(
  given: string | Reading,
  id: string,
  propertySlug: string
): readonly string[] {
  return endingIn(overIndex(given).listing(join(RELATION, "page", "id", id, propertySlug)))
}

export function everyPage(given: string | Reading): readonly Standing[] {
  const reading = overIndex(given)
  return gatheredIn(reading, join(IDENTITY, "page", "id"))
}

function underneath(reading: Reading, at: string, said: string): readonly string[] {
  return reading.listing(at).flatMap((one) => {
    const held = `${said}${one.name}`
    if (one.directory) return underneath(reading, beneath(at, one.name), `${held}/`)
    return one.name.endsWith(ENDING) ? [held.slice(0, -ENDING.length)] : []
  })
}

export function everyPath(given: string | Reading): readonly string[] {
  return [...underneath(overIndex(given), PATH, "")].sort()
}
