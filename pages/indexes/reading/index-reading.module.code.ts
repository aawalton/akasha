import { join } from "node:path"
import { filedFor, type PageAddress } from "akasha/pages/address/page-address.module.code.ts"
import { partedIn } from "akasha/pages/file-name/page-file-name.module.code.ts"
import { indexIdentity } from "akasha/pages/indexes/identity/index-identity.index.ts"
import { indexImport } from "akasha/pages/indexes/import/index-import.index.ts"
import { indexListing } from "akasha/pages/indexes/listing/index-listing.index.ts"
import { indexPath } from "akasha/pages/indexes/path/index-path.index.ts"
import { indexRelation } from "akasha/pages/indexes/relation/index-relation.index.ts"
import type { Reading } from "akasha/pages/indexes/shape/index-shape.module.code.ts"
import {
  beneath,
  INDEX_AT,
  indexAt,
  indexIn,
  readingAt,
  readingOf,
} from "akasha/pages/indexes/surface/index-surface.module.code.ts"
import { indexValue } from "akasha/pages/indexes/value/index-value.index.ts"
import { valueIn } from "akasha/pages/value/page-value.module.code.ts"
import type { Value } from "akasha/pages/value-reading/page-value-reading.module.code.ts"

export type Listed = {
  readonly path: string
  readonly id: string
}

const IDENTITY = indexIdentity.name

const IMPORT = indexImport.name

const LISTING = indexListing.name

const PATH = indexPath.name

const RELATION = indexRelation.name

const VALUE = indexValue.name

const PROPERTY = "page-property"

const ENDING = ".jsonl"

const SLUG = "slug"

const PAGE = "page"

const PAGE_TYPE = "page-type"

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
  return typeof given === "string" ? readingAt(indexIn(given), given) : given
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

export function heldOnce<T>(asked: (reading: Reading) => T): (given: string | Reading) => T {
  const held = new WeakMap<Reading, readonly [T]>()
  return (given) => {
    const reading = readingIn(given)
    const found = held.get(reading)
    if (found !== undefined) return found[0]
    const made: readonly [T] = [asked(reading)]
    held.set(reading, made)
    return made[0]
  }
}

export function heldEach<T>(
  asked: (reading: Reading, said: string) => T
): (given: string | Reading, said: string) => T {
  const held = new WeakMap<Reading, Map<string, T>>()
  return (given, said) => {
    const reading = readingIn(given)
    let each = held.get(reading)
    if (each === undefined) {
      each = new Map<string, T>()
      held.set(reading, each)
    }
    const found = each.get(said)
    if (found !== undefined) return found
    const made = asked(reading, said)
    each.set(said, made)
    return made
  }
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

function slugFolders(reading: Reading, pageTypeSlug: string): readonly string[] {
  const found = [join(IDENTITY, PAGE_TYPE, pageTypeSlug, SLUG)]
  const scoped = join(IDENTITY, PROPERTY, pageTypeSlug)
  for (const property of reading.listing(scoped)) {
    if (!property.directory) continue
    for (const one of reading.listing(join(scoped, property.name))) {
      if (one.directory) found.push(join(scoped, property.name, one.name, SLUG))
    }
  }
  return found
}

const rostered = heldEach((reading: Reading, pageTypeSlug: string): readonly Listed[] => {
  const found: Listed[] = []
  for (const at of slugFolders(reading, pageTypeSlug)) {
    for (const one of reading.listing(at)) {
      if (one.directory || !one.name.endsWith(ENDING)) continue
      found.push(...listedIn(reading, join(at, one.name)))
    }
  }
  return found.sort((one, two) => (one.path < two.path ? -1 : one.path > two.path ? 1 : 0))
})

export function listedNamed(
  given: string | Reading,
  uniqueKind: string,
  scope: string,
  propertySlug: string,
  said: string
): readonly Listed[] {
  return answered(
    given,
    ROOT,
    `which \`${scope === "" ? uniqueKind : scope}\` carries \`${said}\` as its \`${propertySlug}\``,
    (reading) =>
      listedIn(reading, join(IDENTITY, uniqueKind, scope, propertySlug, `${said}${ENDING}`))
  )
}

export function listedAt(
  given: string | Reading,
  pageTypeSlug: string,
  slug: string
): readonly Listed[] {
  return listedNamed(given, PAGE_TYPE, pageTypeSlug, SLUG, slug)
}

export function listedWithin(
  given: string | Reading,
  pageTypeSlug: string,
  scopePropertySlug: string,
  scopeValue: string,
  propertySlug: string,
  said: string
): readonly Listed[] {
  const scope = join(pageTypeSlug, scopePropertySlug, scopeValue)
  return listedNamed(given, PROPERTY, scope, propertySlug, said)
}

export function listedById(given: string | Reading, id: string): Listed | null {
  return answered(
    given,
    ROOT,
    `which page carries \`${id}\``,
    (reading) => listedIn(reading, join(IDENTITY, PAGE, ID, `${id}${ENDING}`))[0] ?? null
  )
}

export function listedEvery(given: string | Reading, address: PageAddress): readonly Listed[] {
  const one = filedFor(address)
  return listedNamed(given, one.uniqueKind, one.scope, one.propertySlug, one.said)
}

export function listedFor(given: string | Reading, address: PageAddress): Listed | null {
  return listedEvery(given, address)[0] ?? null
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

export function importersOf(path: string, reading: Reading): readonly string[] {
  return answered(reading, ROOT, `which files import \`${path}\``, (held) =>
    importersIn(held, path)
  )
}

export function everyOfType(given: string | Reading, pageTypeSlug: string): readonly Listed[] {
  return answered(given, ROOT, `which pages are \`${pageTypeSlug}\``, (reading) =>
    rostered(reading, pageTypeSlug)
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

const valued = heldEach((reading: Reading, pageTypeSlug: string) =>
  answered(reading, ROOT, `what the \`${pageTypeSlug}\` pages carry`, (held) =>
    [...valuesIn(held, join(VALUE, `${pageTypeSlug}${ENDING}`))].sort((one, two) =>
      one.path < two.path ? -1 : one.path > two.path ? 1 : 0
    )
  )
)

export function valuesOfType(given: string | Reading, pageTypeSlug: string): readonly Valued[] {
  return valued(given, pageTypeSlug)
}

const pathed = heldEach((reading: Reading, pageTypeSlug: string): ReadonlyMap<string, Value> => {
  const found = new Map<string, Value>()
  for (const one of valuesOfType(reading, pageTypeSlug)) found.set(one.path, one.value)
  return found
})

export function valuesByPath(
  given: string | Reading,
  pageTypeSlug: string
): ReadonlyMap<string, Value> {
  return pathed(given, pageTypeSlug)
}

const bodied = heldEach((reading: Reading, path: string): Value | null => {
  const body = reading.read(path)
  return body === null ? null : valueIn(body)
})

export function valueByPath(given: string | Reading, path: string): Value | null {
  return bodied(given, path)
}

export function valuedAt(given: string | Reading, pageTypeSlug: string, slug: string): Valued {
  const listed = listedAt(given, pageTypeSlug, slug)[0]
  if (listed === undefined) {
    throw new Error(`no \`${pageTypeSlug}\` page carries the slug \`${slug}\``)
  }
  const value = valueByPath(given, listed.path)
  if (value === null) {
    throw new Error(`\`${listed.path}\` is filed under \`${pageTypeSlug}\` and carries no value`)
  }
  return { path: listed.path, value }
}

export function slugsOfType(given: string | Reading, pageTypeSlug: string): readonly string[] {
  return answered(given, ROOT, `which slugs the \`${pageTypeSlug}\` pages carry`, (reading) => {
    const found = new Set<string>()
    for (const at of slugFolders(reading, pageTypeSlug)) {
      for (const one of endingIn(reading.listing(at))) found.add(one)
    }
    return [...found].sort()
  })
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

export function everyPath(given: string | Reading): readonly string[] {
  return answered(given, ROOT, "which files are there", (reading) =>
    reading.lines(join(LISTING, `${AT_PATH}${ENDING}`))
  )
}

export function filesIn(given: string | Reading, folder: string): readonly string[] {
  return answered(given, ROOT, `which files sit in \`${folder}\``, (reading) =>
    reading
      .listing(join(PATH, folder))
      .filter((one) => !one.directory && one.name.endsWith(ENDING))
      .map((one) => beneath(folder, one.name.slice(0, -ENDING.length)))
      .sort()
  )
}

export function foldersIn(given: string | Reading, folder: string): readonly string[] {
  return answered(given, ROOT, `which folders sit in \`${folder}\``, (reading) =>
    reading
      .listing(join(PATH, folder))
      .filter((one) => one.directory)
      .map((one) => beneath(folder, one.name))
      .sort()
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
