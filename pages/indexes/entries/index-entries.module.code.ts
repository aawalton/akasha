import { join } from "node:path"
import { exportedAs } from "@akasha/pages/page-export-name"
import { slugAt, slugsIn, textAt, type Value } from "@akasha/pages/page-value"
import {
  typeSlugsIn,
  typesAmong,
  typeValuesIn,
} from "../../types/gathering/page-type-gathering.module.code.ts"
import { DECLARING_AT } from "../declaring/index-declaring.index.code.ts"
import { indexIdentity } from "../identity/index-identity.index.ts"
import { answered, heldOnce } from "../reading/index-reading.module.code.ts"
import type { Reading, Schema } from "../shape/index-shape.module.code.ts"

const ENDING = ".jsonl"

const IDENTITY = indexIdentity.name

const PAGE_TYPE = "page-type"

const DECLARED = "properties"

const DECLARES = "pageProperty"

const WAS_DECLARES = "pagePropertySlug"

const EXTENDS = "extends"

const WITHHELD = "uncommitted"

export type Entry = {
  readonly at: string
  readonly line: string
}

function typesFiledIn(reading: Reading): ReadonlySet<string> {
  const found = new Set<string>([PAGE_TYPE])
  for (const one of typeSlugsIn(reading)) {
    for (const each of reading.listing(join(IDENTITY, PAGE_TYPE, one, "slug"))) {
      found.add(each.name.slice(0, -ENDING.length))
    }
  }
  return found
}

const typesFiled = heldOnce(typesFiledIn)

export function pageTypesIn(given: string | Reading): ReadonlySet<string> {
  return typesFiled(given)
}

export const FILE_PROPERTY = "file-property"

export const ENTRY_PROPERTY = "page-property-entry"

type Beside = (pageTypeSlug: string | null) => boolean

function aboveIn(types: ReadonlyMap<string, Value>): ReadonlyMap<string, readonly string[]> {
  const found = new Map<string, readonly string[]>()
  for (const [slug, value] of types) {
    const up = slugsIn(value[EXTENDS])
    if (up.length > 0) found.set(slug, up)
  }
  return found
}

function besidesIn(above: ReadonlyMap<string, readonly string[]>): Beside {
  const held = new Map<string, boolean>()
  const reaches = (slug: string, walked: Set<string>): boolean => {
    if (slug === FILE_PROPERTY || slug === ENTRY_PROPERTY) return true
    if (walked.has(slug)) return false
    walked.add(slug)
    return (above.get(slug) ?? []).some((one) => reaches(one, walked))
  }
  return (pageTypeSlug) => {
    if (pageTypeSlug === null) return false
    const found = held.get(pageTypeSlug)
    if (found !== undefined) return found
    const said = reaches(pageTypeSlug, new Set<string>())
    held.set(pageTypeSlug, said)
    return said
  }
}

function typesIn(given: string | Reading): ReadonlyMap<string, Value> {
  const among = typeSlugsIn(given)
  return typesAmong(typeValuesIn(given, among), among)
}

export function fileKeysIn(values: Iterable<Value>): ReadonlyMap<string, string | null> {
  const held = [...values]
  const beside = besidesIn(aboveIn(typesAmong(held)))
  const found = new Map<string, string | null>()
  for (const value of held) {
    const key = textAt(value, "propertySlug")
    if (key === null) continue
    const fileName = textAt(value, "fileName")
    if (fileName !== null) {
      found.set(key, fileName)
      continue
    }
    if (beside(textAt(value, "type") ?? textAt(value, "pageTypeSlug"))) found.set(key, null)
  }
  return found
}

export type UncommittedBy = ReadonlyMap<string, ReadonlySet<string>>

function schemaFiledIn(reading: Reading): ReadonlyMap<string, Schema> {
  const found = new Map<string, Schema>()
  for (const line of reading.lines(DECLARING_AT)) {
    const said: unknown = JSON.parse(line)
    if (said === null || typeof said !== "object" || Array.isArray(said)) continue
    const held = said as Value
    const pageTypeSlug = textAt(held, "pageTypeSlug") ?? ""
    const slug = textAt(held, "slug") ?? ""
    const named = `${pageTypeSlug}/${slug}`
    if (found.has(named)) continue
    found.set(named, {
      pageTypeSlug,
      targetPageTypeSlug: textAt(held, "targetPageTypeSlug"),
      unique: textAt(held, "unique"),
      uniquePropertySlug: textAt(held, "uniquePropertySlug"),
      slug,
      propertySlug: textAt(held, "propertySlug") ?? "",
      fileName: textAt(held, "fileName"),
      folderName: textAt(held, "folderName"),
    })
  }
  return found
}

const schemaFiled = heldOnce(schemaFiledIn)

export function schemaAt(given: string | Reading): ReadonlyMap<string, Schema> {
  return schemaFiled(given)
}

export function fileKeysAt(given: string | Reading): ReadonlyMap<string, string | null> {
  return answered(given, "", "which keys any page type holds in a file", (reading) => {
    const beside = besidesIn(aboveIn(typesIn(reading)))
    const found = new Map<string, string | null>()
    for (const held of schemaAt(reading).values()) {
      if (held.fileName !== null) found.set(held.propertySlug, held.fileName)
      else if (beside(held.pageTypeSlug)) found.set(held.propertySlug, null)
    }
    return found
  })
}

export type FilePropertiesBy = ReadonlyMap<string, ReadonlyMap<string, string | null>>

export type FoldersBy = ReadonlyMap<string, ReadonlyMap<string, string>>

type Held = {
  readonly pageTypeSlug: string
  readonly propertySlug: string
  readonly fileName: string | null
  readonly folderName: string | null
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
    const pageTypeSlug = textAt(value, "type") ?? textAt(value, "pageTypeSlug")
    if (propertySlug === null || slug === null || pageTypeSlug === null) continue
    const fileName = textAt(value, "fileName")
    const folderName = textAt(value, "folderName")
    found.set(`${pageTypeSlug}/${slug}`, { pageTypeSlug, propertySlug, fileName, folderName })
  }
  return found
}

type Carrying = {
  readonly filed: FilePropertiesBy
  readonly withheld: UncommittedBy
  readonly foldered: FoldersBy
}

function carriedBy(
  properties: ReadonlyMap<string, Held>,
  types: ReadonlyMap<string, Value>
): Carrying {
  const bare = bareAmong(properties)
  const above = aboveIn(types)
  const beside = besidesIn(above)
  const filed = new Map<string, ReadonlyMap<string, string | null>>()
  const withheld = new Map<string, ReadonlySet<string>>()
  const foldered = new Map<string, ReadonlyMap<string, string>>()
  for (const slug of types.keys()) {
    const held = new Map<string, string | null>()
    const outside = new Set<string>()
    const folders = new Map<string, string>()
    const walked = new Set<string>()
    const waiting: string[] = [slug]
    for (let at = 0; at < waiting.length; at += 1) {
      const here = waiting[at]
      if (here === undefined || walked.has(here)) continue
      walked.add(here)
      const declared = types.get(here)?.[DECLARED]
      for (const one of Array.isArray(declared) ? declared : []) {
        if (one === null || typeof one !== "object" || Array.isArray(one)) continue
        const stated = one as Record<string, unknown>
        const said = stated[DECLARES] ?? stated[WAS_DECLARES]
        if (typeof said !== "string") continue
        const hit = (said.includes("/") ? properties.get(said) : bare.get(said)) ?? null
        if (hit === null) continue
        if (hit.folderName !== null && !folders.has(hit.propertySlug)) {
          folders.set(hit.propertySlug, hit.folderName)
        }
        if (hit.fileName === null && !beside(hit.pageTypeSlug)) continue
        if (held.has(hit.propertySlug)) continue
        held.set(hit.propertySlug, hit.fileName)
        if (stated[WITHHELD] === true) outside.add(hit.propertySlug)
      }
      for (const up of [...(above.get(here) ?? [])].reverse()) waiting.push(up)
    }
    filed.set(slug, held)
    withheld.set(slug, outside)
    foldered.set(slug, folders)
  }
  return { filed, withheld, foldered }
}

function filedAmong(given: string | Reading): ReadonlyMap<string, Held> {
  return schemaAt(given)
}

export function filePropertiesIn(values: Iterable<Value>): FilePropertiesBy {
  const held = [...values]
  return carriedBy(propertiesAmong(held), typesAmong(held)).filed
}

function carryingOver(given: string | Reading, left: Iterable<Value>): Carrying {
  const held = [...left]
  const properties = new Map(filedAmong(given))
  for (const [named, one] of propertiesAmong(held)) properties.set(named, one)
  const types = new Map(typesIn(given))
  for (const [slug, value] of typesAmong(held, typeSlugsIn(given))) types.set(slug, value)
  return carriedBy(properties, types)
}

export function filePropertiesOver(
  given: string | Reading,
  left: Iterable<Value>
): FilePropertiesBy {
  return carryingOver(given, left).filed
}

function carryingAt(given: string | Reading): Carrying {
  return answered(given, "", "which properties each page type holds in a file", (reading) =>
    carryingOver(reading, [])
  )
}

export function filePropertiesAt(given: string | Reading): FilePropertiesBy {
  return carryingAt(given).filed
}

export function uncommittedFiledAt(given: string | Reading): UncommittedBy {
  return carryingAt(given).withheld
}

export function folderPropertiesIn(values: Iterable<Value>): FoldersBy {
  const held = [...values]
  return carriedBy(propertiesAmong(held), typesAmong(held)).foldered
}

export function folderPropertiesOver(given: string | Reading, left: Iterable<Value>): FoldersBy {
  return carryingOver(given, left).foldered
}

export function folderPropertiesAt(given: string | Reading): FoldersBy {
  return carryingAt(given).foldered
}

export function entryShapesAt(given: string | Reading): ReadonlySet<string> {
  const found = new Set<string>()
  for (const held of schemaAt(given).values()) {
    if (held.pageTypeSlug === ENTRY_PROPERTY) found.add(held.slug)
  }
  return found
}

export type ScopedBy = {
  readonly key: string
  readonly pagePropertySlug: string
}

export type Identifier = {
  readonly key: string
  readonly uniqueKind: string
  readonly scopedBy?: ScopedBy
}

export function uniquePropertiesIn(values: Iterable<Value>): ReadonlyMap<string, Identifier> {
  const found = new Map<string, Identifier>()
  for (const value of values) {
    const uniqueKind = slugAt(value, "unique")
    const slug = textAt(value, "slug")
    const propertySlug = textAt(value, "propertySlug")
    if (uniqueKind === null || slug === null || propertySlug === null) continue
    found.set(slug, { key: exportedAs(propertySlug), uniqueKind })
  }
  return found
}

export function uniquePropertiesAt(given: string | Reading): ReadonlyMap<string, Identifier> {
  const found = new Map<string, Identifier>()
  for (const held of schemaAt(given).values()) {
    if (held.unique === null || held.propertySlug === "") continue
    found.set(held.slug, { key: exportedAs(held.propertySlug), uniqueKind: held.unique })
  }
  return found
}
