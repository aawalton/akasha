import { join } from "node:path"
import type { Reading, Shape } from "akasha/page/index/modules/shape/index-shape.module.code.ts"
import {
  bucketOf,
  INDEX_AT,
  indexIn,
  readingAt,
} from "akasha/page/index/modules/surface/index-surface.module.code.ts"
import { filedFor, type PageAddress } from "akasha/page/modules/address/page-address.module.code.ts"
import { partedIn } from "akasha/page/modules/file-name/page-file-name.module.code.ts"
import { valueIn } from "akasha/page/modules/value/page-value.module.code.ts"
import type { Value } from "akasha/page/modules/value-reading/page-value-reading.module.code.ts"
import {
  shapesFiledAt,
  shapesIn,
} from "akasha/page/type/page-property/modules/property-shape/property-shape.module.code.ts"

export type Listed = {
  readonly path: string
  readonly id: string
}

const PROPERTY = "page-property"

const ENDING = ".jsonl"

const SLUG = "slug"

const PAGE = "page"

const PAGE_TYPE = "page-type"

const ID = "id"

const NO_SCOPE = ""

const HELD_TS = "ts"

export function indexNamed(): string {
  return INDEX_AT
}

export function indexThere(given: string | Reading): boolean {
  return readingIn(given).holds("")
}

export function readingIn(given: string | Reading): Reading {
  return typeof given === "string" ? readingAt(indexIn(given), given) : given
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
  const found = [join(PAGE_TYPE, pageTypeSlug, SLUG)]
  const scoped = join(PROPERTY, pageTypeSlug)
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
  const reading = readingIn(given)
  const name = `${said}${ENDING}`
  const bucket = bucketOf(said)
  if (bucket !== null) {
    const found = listedIn(reading, join(uniqueKind, scope, propertySlug, bucket, name))
    if (found.length > 0) return found
  }
  return listedIn(reading, join(uniqueKind, scope, propertySlug, name))
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
  return listedNamed(given, PAGE, NO_SCOPE, ID, id)[0] ?? null
}

export function listedEvery(given: string | Reading, address: PageAddress): readonly Listed[] {
  const one = filedFor(address)
  return listedNamed(given, one.uniqueKind, one.scope, one.propertySlug, one.said)
}

export function listedFor(given: string | Reading, address: PageAddress): Listed | null {
  return listedEvery(given, address)[0] ?? null
}

export function everyOfType(given: string | Reading, pageTypeSlug: string): readonly Listed[] {
  return rostered(given, pageTypeSlug)
}

export type Valued = {
  readonly path: string
  readonly value: Value
}

export function everyValue(given: string | Reading): ReadonlyMap<string, Value> {
  const reading = readingIn(given)
  const found = new Map<string, Value>()
  for (const pageTypeSlug of slugsOfType(reading, PAGE_TYPE)) {
    for (const one of valuesOfType(reading, pageTypeSlug)) found.set(one.path, one.value)
  }
  return found
}

const valued = heldEach((reading: Reading, pageTypeSlug: string): readonly Valued[] => {
  const found: Valued[] = []
  for (const one of everyOfType(reading, pageTypeSlug)) {
    const value = valueByPath(reading, one.path)
    if (value !== null) found.push({ path: one.path, value })
  }
  return found
})

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

function shapesFiled(reading: Reading, path: string): readonly Shape[] {
  const at = shapesFiledAt(path)
  if (at === null) return []
  const body = reading.read(at)
  return body === null ? [] : shapesIn(body)
}

const everyShaped = heldOnce((reading: Reading): ReadonlyMap<string, Shape> => {
  const found = new Map<string, Shape>()
  for (const listed of rostered(reading, PAGE_TYPE)) {
    for (const held of shapesFiled(reading, listed.path)) {
      const named = `${held.pageTypeSlug}/${held.slug}`
      if (!found.has(named)) found.set(named, held)
    }
  }
  return found
})

export function shapesEvery(given: string | Reading): ReadonlyMap<string, Shape> {
  return everyShaped(given)
}

const shapedOfType = heldEach(
  (reading: Reading, pageTypeSlug: string): ReadonlyMap<string, Shape> => {
    const found = new Map<string, Shape>()
    const one = listedAt(reading, PAGE_TYPE, pageTypeSlug)[0]
    if (one === undefined) return found
    for (const held of shapesFiled(reading, one.path)) {
      if (!found.has(held.slug)) found.set(held.slug, held)
    }
    return found
  }
)

export function shapesOfType(
  given: string | Reading,
  pageTypeSlug: string
): ReadonlyMap<string, Shape> {
  return shapedOfType(given, pageTypeSlug)
}

function typeScriptAt(path: string): boolean {
  const said = partedIn(path)
  return said !== null && said.held === HELD_TS
}

const bodied = heldEach((reading: Reading, path: string): Value | null => {
  if (!typeScriptAt(path)) return null
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

export function slugFoldersOf(given: string | Reading, pageTypeSlug: string): readonly string[] {
  return slugFolders(readingIn(given), pageTypeSlug).map((at) => join(INDEX_AT, at))
}

export function slugsOfType(given: string | Reading, pageTypeSlug: string): readonly string[] {
  const reading = readingIn(given)
  const found = new Set<string>()
  for (const at of slugFolders(reading, pageTypeSlug)) {
    for (const one of endingIn(reading.listing(at))) found.add(one)
  }
  return [...found].sort()
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
