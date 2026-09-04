import { dirname, isAbsolute, join, relative } from "node:path"
import { exportedAs } from "@akasha/pages-system/page-export-name"
import { besideAt, secretAt, uncommittedAt } from "@akasha/pages-system/page-file-name"
import { partsOf } from "@akasha/pages-system/page-file-parts"
import { slugFor } from "@akasha/pages-system/page-property-key"
import { slugAt, slugsIn, textAt, type Value } from "@akasha/pages-system/page-value"
import { indexIdentity } from "../index/identity/index-identity.index.ts"
import { indexSchema } from "../index/schema/index-schema.index.ts"
import { answered, readingIn, valuesOfType } from "../index-reading/index-reading.module.code.ts"
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

export function fileKeysIn(values: Iterable<Value>): ReadonlyMap<string, string | null> {
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

export type IsThere = (at: string) => boolean

export function pathsOf(
  value: Value,
  path: string,
  repo: string,
  fileProperties: FilePropertiesBy,
  there: IsThere = () => false
): readonly string[] {
  const own = under(repo, path)
  const found = [own]
  const carried = fileProperties.get(textAt(value, "pageTypeSlug") ?? "")
  if (carried === undefined) return found
  for (const [key, held] of Object.entries(value)) {
    if (typeof held !== "string") continue
    const propertySlug = slugFor(key)
    if (!carried.has(propertySlug)) continue
    const fileName = carried.get(propertySlug) ?? null
    if (fileName !== null) {
      found.push(join(dirname(own), fileName))
      continue
    }
    found.push(...partsOf(own, propertySlug, held, there))
  }
  return found
}

export type Sidecars = {
  readonly secret: boolean
  readonly uncommitted: boolean
  readonly besides: ReadonlyMap<string, string>
}

export type SidecarsBy = ReadonlyMap<string, Sidecars>

const PAGE_TYPE = "page-type"

const DECLARED = "properties"

const DECLARES = "pagePropertySlug"

const EXTENDS = "extendsSlug"

const FALLBACK = "default"

function declaredIn(value: Value): Sidecars {
  let secret = false
  let uncommitted = false
  const found = new Map<string, string>()
  const declared = value[DECLARED]
  if (!Array.isArray(declared)) return { secret, uncommitted, besides: found }
  for (const one of declared) {
    if (one === null || typeof one !== "object" || Array.isArray(one)) continue
    const held = one as Record<string, unknown>
    if (held["secret"] === true) secret = true
    if (held["uncommitted"] === true) uncommitted = true
    const slug = held[DECLARES]
    const fallback = held[FALLBACK]
    if (typeof slug === "string" && typeof fallback === "string") found.set(slug, fallback)
  }
  return { secret, uncommitted, besides: found }
}

export function sidecarsIn(values: Iterable<Value>): SidecarsBy {
  const own = new Map<string, Sidecars>()
  const above = new Map<string, readonly string[]>()
  for (const value of values) {
    if (textAt(value, "pageTypeSlug") !== PAGE_TYPE) continue
    const slug = textAt(value, "slug")
    if (slug === null) continue
    own.set(slug, declaredIn(value))
    const extended = slugsIn(value[EXTENDS])
    if (extended.length > 0) above.set(slug, extended)
  }
  const found = new Map<string, Sidecars>()
  for (const slug of own.keys()) {
    let secret = false
    let uncommitted = false
    const beside = new Map<string, string>()
    const walked = new Set<string>()
    const waiting: string[] = [slug]
    for (let at = 0; at < waiting.length; at += 1) {
      const here = waiting[at]
      if (here === undefined || walked.has(here)) continue
      walked.add(here)
      const held = own.get(here)
      if (held?.secret === true) secret = true
      if (held?.uncommitted === true) uncommitted = true
      for (const [key, fallback] of held?.besides ?? []) {
        if (!beside.has(key)) beside.set(key, fallback)
      }
      for (const up of [...(above.get(here) ?? [])].reverse()) waiting.push(up)
    }
    found.set(slug, { secret, uncommitted, besides: beside })
  }
  return found
}

export function sidecarsOver(given: string | Reading, left: Iterable<Value>): SidecarsBy {
  const filed = valuesOfType(given, PAGE_TYPE).map((one) => one.value)
  return sidecarsIn([...filed, ...left])
}

export function claimsOf(
  value: Value,
  path: string,
  repo: string,
  fileProperties: FilePropertiesBy,
  sidecars: SidecarsBy,
  there: IsThere = () => false
): readonly string[] {
  const found = [...pathsOf(value, path, repo, fileProperties, there)]
  const own = under(repo, path)
  const pageTypeSlug = textAt(value, "pageTypeSlug") ?? ""
  const carried = fileProperties.get(pageTypeSlug)
  const held = sidecars.get(pageTypeSlug)
  if (held === undefined) return found
  if (held.secret) {
    const secret = secretAt(own)
    if (secret !== null) found.push(secret)
  }
  if (held.uncommitted) {
    const beside = uncommittedAt(own)
    if (beside !== null) found.push(beside)
  }
  for (const [slug, fallback] of held.besides) {
    if (carried?.get(slug) !== null) continue
    const beside = besideAt(own, slug, fallback)
    if (beside !== null && !found.includes(beside)) found.push(beside)
  }
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

export function fileKeysAt(given: string | Reading): ReadonlyMap<string, string | null> {
  return answered(given, "", "which keys any page type holds in a file", (reading) => {
    const found = new Map<string, string | null>()
    for (const held of schemaAt(reading).values()) {
      if (held.fileName !== null) found.set(held.propertySlug, held.fileName)
      else if (besides(held.pageTypeSlug)) found.set(held.propertySlug, null)
    }
    return found
  })
}

export type FilePropertiesBy = ReadonlyMap<string, ReadonlyMap<string, string | null>>

type Held = {
  readonly pageTypeSlug: string
  readonly propertySlug: string
  readonly fileName: string | null
}

function bareAmong(properties: ReadonlyMap<string, Held>): ReadonlyMap<string, Held | null> {
  const found = new Map<string, Held | null>()
  for (const [named, one] of properties) {
    const slug = named.slice(named.indexOf("/") + 1)
    found.set(slug, found.has(slug) ? null : one)
  }
  return found
}

function propertiesAmong(values: Iterable<Value>): ReadonlyMap<string, Held> {
  const found = new Map<string, Held>()
  for (const value of values) {
    const propertySlug = textAt(value, "propertySlug")
    const slug = textAt(value, "slug")
    const pageTypeSlug = textAt(value, "pageTypeSlug")
    if (propertySlug === null || slug === null || pageTypeSlug === null) continue
    const fileName = textAt(value, "fileName")
    found.set(`${pageTypeSlug}/${slug}`, { pageTypeSlug, propertySlug, fileName })
  }
  return found
}

function typesAmong(values: Iterable<Value>): ReadonlyMap<string, Value> {
  const found = new Map<string, Value>()
  for (const value of values) {
    if (textAt(value, "pageTypeSlug") !== PAGE_TYPE) continue
    const slug = textAt(value, "slug")
    if (slug !== null) found.set(slug, value)
  }
  return found
}

function carriedBy(
  properties: ReadonlyMap<string, Held>,
  types: ReadonlyMap<string, Value>
): FilePropertiesBy {
  const bare = bareAmong(properties)
  const above = new Map<string, readonly string[]>()
  for (const [slug, value] of types) {
    const up = slugsIn(value[EXTENDS])
    if (up.length > 0) above.set(slug, up)
  }
  const found = new Map<string, ReadonlyMap<string, string | null>>()
  for (const slug of types.keys()) {
    const held = new Map<string, string | null>()
    const walked = new Set<string>()
    const waiting: string[] = [slug]
    for (let at = 0; at < waiting.length; at += 1) {
      const here = waiting[at]
      if (here === undefined || walked.has(here)) continue
      walked.add(here)
      const declared = types.get(here)?.[DECLARED]
      for (const one of Array.isArray(declared) ? declared : []) {
        if (one === null || typeof one !== "object" || Array.isArray(one)) continue
        const said = (one as Record<string, unknown>)[DECLARES]
        if (typeof said !== "string") continue
        const hit = (said.includes("/") ? properties.get(said) : bare.get(said)) ?? null
        if (hit === null) continue
        if (hit.fileName === null && !besides(hit.pageTypeSlug)) continue
        if (!held.has(hit.propertySlug)) held.set(hit.propertySlug, hit.fileName)
      }
      for (const up of [...(above.get(here) ?? [])].reverse()) waiting.push(up)
    }
    found.set(slug, held)
  }
  return found
}

function filedAmong(given: string | Reading): ReadonlyMap<string, Held> {
  const found = new Map<string, Held>()
  for (const [named, held] of schemaAt(given)) {
    const { pageTypeSlug, propertySlug, fileName } = held
    found.set(named, { pageTypeSlug, propertySlug, fileName })
  }
  return found
}

export function filePropertiesIn(values: Iterable<Value>): FilePropertiesBy {
  const held = [...values]
  return carriedBy(propertiesAmong(held), typesAmong(held))
}

export function filePropertiesOver(
  given: string | Reading,
  left: Iterable<Value>
): FilePropertiesBy {
  const held = [...left]
  const properties = new Map(filedAmong(given))
  for (const [named, one] of propertiesAmong(held)) properties.set(named, one)
  const types = new Map(typesAmong(valuesOfType(given, PAGE_TYPE).map((one) => one.value)))
  for (const [slug, value] of typesAmong(held)) types.set(slug, value)
  return carriedBy(properties, types)
}

export function filePropertiesAt(given: string | Reading): FilePropertiesBy {
  return answered(given, "", "which properties each page type holds in a file", (reading) =>
    filePropertiesOver(reading, [])
  )
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
