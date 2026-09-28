import { NEVER_MATCH_VALUE } from "akasha/page/access/modules/sentinels/sentinels.module.code.ts"
import { segmentsOf } from "akasha/page/core/filter/modules/property-path/property-path.module.code.ts"
import type { PropertyDefinition } from "akasha/page/core/modules/page-data/page-data.module.code.ts"
import { readTargetPageTypeSlug } from "akasha/page/core/property-type/modules/relation/relation.module.code.ts"
import type { ReadonlyJSONValue } from "akasha/page/core/schema/modules/pages/pages.module.code.ts"
import type {
  ViewDataJSON,
  ViewFilter,
} from "akasha/page/core/schema/modules/view-data/view-data.module.code.ts"
import {
  applyFilters,
  type FilterableRow,
  readingOf,
} from "akasha/page/core/view/modules/apply-filters/apply-filters.module.code.ts"
import { namedAs } from "akasha/page/modules/address/page-address.module.code.ts"

export type RelatedFilter = {
  readonly relation: string
  readonly pageTypeSlug: string
  readonly filter: ViewFilter
  readonly definitions: readonly PropertyDefinition[]
}

export type ReadFilters =
  | { readonly unread: true }
  | { readonly refused: string }
  | { readonly own: readonly ViewFilter[]; readonly related: readonly RelatedFilter[] }

export type DefinitionsOf = (pageTypeSlug: string) => readonly PropertyDefinition[] | undefined

type Read = { readonly filter: ViewFilter } | { readonly refused: string }

type ReadRelated = { readonly related: RelatedFilter } | { readonly refused: string }

const UNREAD = { unread: true } as const

const RELATIONS: ReadonlySet<string> = new Set(["relation", "multi-relation"])

const NUMBER = "number"

const BOOLEAN = "boolean"

function oneRead(value: ReadonlyJSONValue, type: string): ReadonlyJSONValue | undefined {
  if (typeof value !== "string") return value
  if (type === NUMBER) {
    const number = Number(value)
    return value.trim() !== "" && Number.isFinite(number) ? number : undefined
  }
  if (type === BOOLEAN) {
    if (value === "true") return true
    return value === "false" ? false : undefined
  }
  return value
}

function ownRead(filter: ViewFilter, definitions: readonly PropertyDefinition[]): Read {
  const reading = readingOf(filter, definitions)
  if ("refused" in reading) return reading
  const held = filter.value
  if (held === undefined || held === null) return { filter }
  const type = reading.definition.type
  const listed: readonly ReadonlyJSONValue[] = Array.isArray(held) ? held : [held]
  const read: ReadonlyJSONValue[] = []
  for (const one of listed) {
    const value = oneRead(one, type)
    if (value === undefined) {
      return { refused: `\`${filter.propertyId}\` holds a ${type}, and \`${String(one)}\` is none` }
    }
    read.push(value)
  }
  return { filter: { ...filter, value: Array.isArray(held) ? read : read[0] } }
}

function relatedRead(
  filter: ViewFilter,
  relation: PropertyDefinition,
  definitionsOf: DefinitionsOf
): ReadRelated | typeof UNREAD {
  const key = filter.propertyId
  const pageTypeSlug = readTargetPageTypeSlug(relation.config)
  if (pageTypeSlug === undefined) {
    return { refused: `\`${key}\` reaches through \`${relation.id}\`, which names no page type` }
  }
  const definitions = definitionsOf(pageTypeSlug)
  if (definitions === undefined || definitions.length === 0) return UNREAD
  const rest = segmentsOf(key).slice(1).join(".")
  const read = ownRead({ ...filter, propertyId: rest }, definitions)
  if ("refused" in read) {
    return { refused: `\`${key}\` reaches the \`${pageTypeSlug}\` it names, where ${read.refused}` }
  }
  return { related: { relation: relation.id, pageTypeSlug, filter: read.filter, definitions } }
}

export function readViewFilters(
  filters: readonly ViewFilter[],
  definitions: readonly PropertyDefinition[],
  definitionsOf: DefinitionsOf
): ReadFilters {
  if (filters.length === 0) return { own: [], related: [] }
  if (definitions.length === 0) return UNREAD
  const own: ViewFilter[] = []
  const related: RelatedFilter[] = []
  for (const filter of filters) {
    const segments = segmentsOf(filter.propertyId)
    const head = definitions.find((one) => one.id === segments[0])
    if (segments.length > 1 && head !== undefined && RELATIONS.has(head.type)) {
      const read = relatedRead(filter, head, definitionsOf)
      if ("unread" in read || "refused" in read) return read
      related.push(read.related)
      continue
    }
    const read = ownRead(filter, definitions)
    if ("refused" in read) return read
    own.push(read.filter)
  }
  return { own, related }
}

function sameFilter(one: ViewFilter, other: ViewFilter): boolean {
  return (
    one.propertyId === other.propertyId &&
    one.operator === other.operator &&
    JSON.stringify(one.value) === JSON.stringify(other.value)
  )
}

function reachesThrough(filter: ViewFilter, definitions: readonly PropertyDefinition[]): boolean {
  const segments = segmentsOf(filter.propertyId)
  const head = definitions.find((one) => one.id === segments[0])
  return segments.length > 1 && head !== undefined && RELATIONS.has(head.type)
}

export function withRelatedKept(
  written: readonly ViewFilter[],
  stated: readonly ViewFilter[],
  definitions: readonly PropertyDefinition[]
): readonly ViewFilter[] {
  const kept = stated.filter(
    (one) => reachesThrough(one, definitions) && !written.some((held) => sameFilter(held, one))
  )
  return [...written, ...kept]
}

export function narrowedBy(config: ViewDataJSON, narrows: readonly ViewFilter[]): ViewDataJSON {
  if (narrows.length === 0) return config
  return { ...config, filters: [...(config.filters ?? []), ...narrows] }
}

export function besideNarrows(
  filters: readonly ViewFilter[],
  narrows: readonly ViewFilter[]
): readonly ViewFilter[] {
  const kept = [...filters]
  for (let at = narrows.length - 1; at >= 0; at--) {
    const narrow = narrows[at]
    if (narrow === undefined) continue
    for (let one = kept.length - 1; one >= 0; one--) {
      const held = kept[one]
      if (held === undefined || !sameFilter(held, narrow)) continue
      kept.splice(one, 1)
      break
    }
  }
  return kept
}

function nameOf(row: FilterableRow): string | null {
  const { pageTypeSlug, slug } = row
  if (typeof pageTypeSlug !== "string" || typeof slug !== "string" || slug === "") return null
  return namedAs(pageTypeSlug, slug, null)
}

export function relatedFilterOf(
  related: RelatedFilter,
  rows: readonly FilterableRow[],
  kinds: ReadonlySet<string>
): ViewFilter {
  const listed = rows.filter(
    (row) => typeof row.pageTypeSlug === "string" && kinds.has(row.pageTypeSlug)
  )
  const named: string[] = []
  for (const row of applyFilters(listed, [related.filter], related.definitions)) {
    const name = nameOf(row)
    if (name !== null) named.push(name)
  }
  return {
    propertyId: related.relation,
    operator: "includes",
    value: named.length > 0 ? named.sort() : [NEVER_MATCH_VALUE],
  }
}
