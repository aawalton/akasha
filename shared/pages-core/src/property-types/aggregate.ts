import { assertNever } from "../../../utils-narrow/src/assert-never"
import { isComputed, resolveComputedProperties } from "../formula/resolve"
import { type AggregateFilter, aggregateFilterSchema } from "../schema/property-config-schemas"
import type { PageDataJSON, PropertyDefinition } from "../types"
import type { ReadonlyJSONValue } from "../schema/pages"
import { matchesAggregateFilter } from "./aggregate-filter"
import { toNumber } from "./number"
import type { PageTypePropertiesMap } from "./rollup"
import type { FilterConfig, FilterOperatorOption, PropertyTypeOps, PropertyValue } from "./types"

export type AggregateFunction = "sum" | "count" | "avg" | "min" | "max" | "first" | "count_distinct"

const AGGREGATE_FUNCTION_SET: ReadonlySet<string> = new Set([
  "sum",
  "count",
  "avg",
  "min",
  "max",
  "first",
  "count_distinct",
])

function isAggregateFunction(value: string): value is AggregateFunction {
  return AGGREGATE_FUNCTION_SET.has(value)
}

export interface AggregateConfig {
  readonly relationPropertyId: string
  readonly targetPropertyId: string
  readonly function: AggregateFunction
  readonly filter?: AggregateFilter
}

export interface AggregateInput {
  readonly id: string
  readonly data: PageDataJSON
}

const EMPTY_PAGE_TYPES: PageTypePropertiesMap = new Map()

function readTargetValue(
  page: AggregateInput,
  targetPropertyId: string,
  pageTypes: PageTypePropertiesMap
): ReadonlyJSONValue | null {
  const typeId = page.data.pageTypeId
  if (typeof typeId === "string") {
    const defs = pageTypes.get(typeId)
    if (defs) {
      const def = defs.find((d) => d.id === targetPropertyId)
      if (def !== undefined && isComputed(def)) {
        return resolveComputedProperties(page.data, defs)[targetPropertyId] ?? null
      }
    }
  }
  return page.data[targetPropertyId] ?? null
}

export function computeAggregate(
  config: AggregateConfig,
  currentPageData: PageDataJSON,
  allPages: readonly AggregateInput[],
  pageTypes: PageTypePropertiesMap = EMPTY_PAGE_TYPES
): number | null {
  const rawTargetIds = currentPageData[config.relationPropertyId]
  if (!Array.isArray(rawTargetIds)) {
    return config.function === "count" || config.function === "count_distinct" ? 0 : null
  }
  const targetIds: readonly string[] = rawTargetIds.filter(
    (v): v is string => typeof v === "string"
  )

  const targetIdSet = new Set(targetIds)
  const matched = allPages.filter((p) => targetIdSet.has(p.id))
  const filter = config.filter
  const related = filter ? matched.filter((p) => matchesAggregateFilter(p.data, filter)) : matched

  if (config.function === "count") return related.length

  if (config.function === "first") {
    const pageById = new Map(related.map((p) => [p.id, p]))
    for (const id of targetIds) {
      const page = pageById.get(id)
      if (!page) continue
      const n = toNumber(readTargetValue(page, config.targetPropertyId, pageTypes))
      if (n !== null) return n
    }
    return null
  }

  const values = related
    .map((p) => toNumber(readTargetValue(p, config.targetPropertyId, pageTypes)))
    .filter((v): v is number => v !== null)

  if (config.function === "count_distinct") return new Set(values).size

  if (values.length === 0) return null

  switch (config.function) {
    case "sum":
      return values.reduce((a, b) => a + b, 0)
    case "avg":
      return values.reduce((a, b) => a + b, 0) / values.length
    case "min":
      return Math.min(...values)
    case "max":
      return Math.max(...values)
    default:
      assertNever(config.function)
  }
}

function parseAggregateConfig(raw: PropertyDefinition["config"]): AggregateConfig | null {
  if (!raw) return null
  const rel = raw.relationPropertyId
  const fn = raw.function
  if (typeof rel !== "string") return null
  if (typeof fn !== "string" || !isAggregateFunction(fn)) return null
  const filterParsed = raw.filter == null ? null : aggregateFilterSchema.safeParse(raw.filter)
  const filter: AggregateFilter | undefined =
    filterParsed?.success === true ? filterParsed.data : undefined
  const tgt = raw.targetPropertyId
  if (typeof tgt !== "string") {
    if (fn === "count")
      return { relationPropertyId: rel, targetPropertyId: "", function: fn, filter }
    return null
  }
  return { relationPropertyId: rel, targetPropertyId: tgt, function: fn, filter }
}

export function computeAggregatesForPage(
  data: PageDataJSON,
  definitions: readonly PropertyDefinition[],
  relatedPages: readonly AggregateInput[],
  pageTypes: PageTypePropertiesMap
): Record<string, number | null> {
  const result: Record<string, number | null> = {}
  for (const def of definitions) {
    if (def.type !== "aggregate") continue
    const config = parseAggregateConfig(def.config)
    if (config === null) continue
    result[def.id] = computeAggregate(config, data, relatedPages, pageTypes)
  }
  return result
}

export function computeFillAggregatesForPage(
  data: PageDataJSON,
  definitions: readonly PropertyDefinition[],
  relatedPages: readonly AggregateInput[],
  pageTypes: PageTypePropertiesMap
): Record<string, number | null> {
  const fill: Record<string, number | null> = {}
  for (const def of definitions) {
    if (def.type !== "aggregate") continue
    if (data[def.id] != null) continue
    const config = parseAggregateConfig(def.config)
    if (config === null) continue
    fill[def.id] = computeAggregate(config, data, relatedPages, pageTypes)
  }
  return fill
}

export const aggregateOps: PropertyTypeOps = {
  validate() {
    return null
  },

  getSortValue(value: PropertyValue) {
    return toNumber(value)
  },

  getFilterOperators(): readonly FilterOperatorOption[] {
    return [
      { value: "is_empty", label: "Is empty" },
      { value: "is_not_empty", label: "Is not empty" },
    ]
  },

  getFilterPredicate(config: FilterConfig) {
    const filterNum = toNumber(config.value ?? null)

    return (value) => {
      const n = toNumber(value)
      switch (config.operator) {
        case "equals":
          return n === filterNum
        case "not_equals":
          return n !== filterNum
        case "gt":
          return n !== null && filterNum !== null && n > filterNum
        case "lt":
          return n !== null && filterNum !== null && n < filterNum
        case "gte":
          return n !== null && filterNum !== null && n >= filterNum
        case "lte":
          return n !== null && filterNum !== null && n <= filterNum
        case "is_empty":
          return n === null
        case "is_not_empty":
          return n !== null
        default:
          return true
      }
    }
  },
}
