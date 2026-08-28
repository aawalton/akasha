import { camelizeKey } from "@shared/pages-access/file-rows"
import { parseViewDataJSON, type ViewDataJSON, type ViewFilter, type ViewLayout, type ViewSort } from "@shared/pages-core/schema/view-data"
import { pageQueryTimeIn } from "@shared/pages-core/view/page-query-times"
import * as z from "zod"

export type PageTypeIdBySlug = (pageTypeSlug: string) => string | undefined

const TODAY = { sentinel: "today" } as const

const VIEW_LAYOUTS: readonly ViewLayout[] = [
  "cards",
  "table",
  "grid",
  "board",
  "list",
  "calendar",
  "gallery",
  "notes",
  "timeline",
]

function isViewLayout(value: string): value is ViewLayout {
  return VIEW_LAYOUTS.some((one) => one === value)
}

function textOf(value: unknown): string | undefined {
  if (typeof value === "string") return value === "" ? undefined : value
  if (typeof value === "number") return String(value)
  return undefined
}

function intOf(value: unknown): number | undefined {
  if (typeof value === "number") return Number.isInteger(value) && value > 0 ? value : undefined
  if (typeof value !== "string" || value === "") return undefined
  const n = Number(value)
  return Number.isInteger(n) && n > 0 ? n : undefined
}

function boolOf(value: unknown): boolean | undefined {
  if (typeof value === "boolean") return value
  if (value === "true") return true
  if (value === "false") return false
  return undefined
}

function stringListOf(value: unknown): readonly string[] | undefined {
  if (!Array.isArray(value)) return undefined
  const out: string[] = []
  for (const one of value) {
    const text = textOf(one)
    if (text !== undefined) out.push(text)
  }
  return out.length > 0 ? out : undefined
}

function keyListOf(value: unknown): readonly string[] | undefined {
  const texts = stringListOf(value)
  return texts === undefined ? undefined : texts.map((one) => camelizeKey(one))
}

function sortsOf(by: unknown, descending: unknown): readonly ViewSort[] | undefined {
  const keys = stringListOf(by)
  if (keys === undefined) return undefined
  const down = new Set(stringListOf(descending) ?? [])
  return keys.map((field) => ({
    field: camelizeKey(field),
    direction: down.has(field) ? ("desc" as const) : ("asc" as const),
  }))
}

type Bound = { readonly operator: string; readonly value: unknown }

function boundBelow(raw: unknown): Bound {
  const text = textOf(raw)
  if (text === undefined || pageQueryTimeIn(text) === null) return { operator: "lt", value: raw }
  return text === "eso-day-next"
    ? { operator: "lte", value: TODAY }
    : { operator: "lt", value: TODAY }
}

function boundAbove(raw: unknown): Bound {
  const text = textOf(raw)
  if (text === undefined || pageQueryTimeIn(text) === null) return { operator: "gte", value: raw }
  return text === "eso-day-next"
    ? { operator: "gt", value: TODAY }
    : { operator: "gte", value: TODAY }
}

function isMapping(value: unknown): value is Readonly<Record<string, unknown>> {
  return typeof value === "object" && value !== null && !Array.isArray(value)
}

function isFilterValue(value: unknown): value is ViewFilter["value"] {
  if (value === null || value === undefined) return true
  if (typeof value === "string" || typeof value === "number" || typeof value === "boolean") {
    return true
  }
  if (Array.isArray(value)) return value.every(isFilterValue)
  if (typeof value !== "object") return false
  return Object.values(value).every(isFilterValue)
}

function asFilterValue(value: unknown): ViewFilter["value"] {
  return isFilterValue(value) ? value : undefined
}

function filtersForKey(propertyKey: string, tests: unknown): readonly ViewFilter[] {
  if (!isMapping(tests)) return []
  const propertyId = camelizeKey(propertyKey)
  const out: ViewFilter[] = []
  for (const [test, raw] of Object.entries(tests)) {
    if (test === "is") out.push({ propertyId, operator: "equals", value: asFilterValue(raw) })
    else if (test === "in")
      out.push({ propertyId, operator: "includes", value: asFilterValue(raw) })
    else if (test === "has")
      out.push({ propertyId, operator: "includes", value: asFilterValue(raw) })
    else if (test === "not-in")
      out.push({ propertyId, operator: "not_includes", value: asFilterValue(raw) })
    else if (test === "contains")
      out.push({ propertyId, operator: "contains", value: asFilterValue(raw) })
    else if (test === "empty") {
      const wanted = boolOf(raw)
      if (wanted !== undefined) {
        out.push({ propertyId, operator: wanted ? "is_empty" : "is_not_empty" })
      }
    } else if (test === "before") {
      const bound = boundBelow(raw)
      out.push({ propertyId, operator: bound.operator, value: asFilterValue(bound.value) })
    } else if (test === "at-or-after") {
      const bound = boundAbove(raw)
      out.push({ propertyId, operator: bound.operator, value: asFilterValue(bound.value) })
    }
  }
  return out
}

const filterMappingSchema = z.record(z.string(), z.unknown())

function filtersOf(raw: unknown): readonly ViewFilter[] | undefined {
  let mapping: unknown = raw
  if (typeof raw === "string") {
    if (raw === "") return undefined
    try {
      const opened = filterMappingSchema.safeParse(JSON.parse(raw))
      if (!opened.success) return undefined
      mapping = opened.data
    } catch {
      return undefined
    }
  }
  if (!isMapping(mapping)) return undefined
  const out: ViewFilter[] = []
  for (const [propertyKey, tests] of Object.entries(mapping)) {
    out.push(...filtersForKey(propertyKey, tests))
  }
  return out.length > 0 ? out : undefined
}

function layoutOf(value: unknown): ViewDataJSON["layout"] {
  const text = textOf(value)
  if (text === undefined || !isViewLayout(text)) return undefined
  return text
}

function cardSizeOf(value: unknown): ViewDataJSON["gallery_card_size"] {
  const text = textOf(value)
  if (text === "small" || text === "medium" || text === "large") return text
  return undefined
}

function granularityOf(value: unknown): ViewDataJSON["group_granularity"] {
  const text = textOf(value)
  if (text === "none" || text === "week" || text === "month" || text === "year") return text
  return undefined
}

function groupByOf(value: unknown): string | undefined {
  const text = textOf(value)
  return text === undefined ? undefined : camelizeKey(text)
}

export function isFileSpelledView(properties: Readonly<Record<string, unknown>>): boolean {
  return (
    properties.nav !== undefined ||
    properties.pageType !== undefined ||
    properties.where !== undefined ||
    properties.sortBy !== undefined ||
    properties.visibleProperties !== undefined
  )
}

export function viewDataFromFile(
  properties: Readonly<Record<string, unknown>>,
  resolvePageTypeId?: PageTypeIdBySlug
): ViewDataJSON {
  const pageTypeSlug = textOf(properties.pageType)
  const data: ViewDataJSON = {
    version: 1,
    layout: layoutOf(properties.layout),
    visible_properties: keyListOf(properties.visibleProperties),
    always_show_properties: keyListOf(properties.alwaysShowProperties),
    hidden_properties_order: keyListOf(properties.hiddenPropertiesOrder),
    sorts: sortsOf(properties.sortBy, properties.sortDescending),
    filters: filtersOf(properties.where),
    group_by: groupByOf(properties.groupBy),
    group_sorts: sortsOf(properties.groupSortBy, properties.groupSortDescending),
    group_granularity: granularityOf(properties.groupGranularity),
    gallery_cover_source: textOf(properties.galleryCoverSource),
    gallery_card_size: cardSizeOf(properties.galleryCardSize),
    timeline_start_property: textOf(properties.timelineStartProperty),
    timeline_end_property: textOf(properties.timelineEndProperty),
    page_size: intOf(properties.pageSize),
    group_page_size: intOf(properties.groupPageSize),
    item_page_size: intOf(properties.itemPageSize),
    title_properties: keyListOf(properties.titleProperties),
    title_properties_align: textOf(properties.titlePropertiesAlign) === "end" ? "end" : "start",
    pageTypeSlug,
    pageTypeId:
      pageTypeSlug === undefined || resolvePageTypeId === undefined
        ? undefined
        : resolvePageTypeId(pageTypeSlug),
  }
  const predicateKey = textOf(properties.predicate)
  if (predicateKey !== undefined) data.crossTypeSource = { predicateKey }
  const verbId = textOf(properties.reorderCommand)
  if (verbId !== undefined) data.reorder = { verbId }
  if (boolOf(properties.lockedPageType) === true) data.locked = { pageType: true }
  return data
}

export function viewDataOfPage(
  properties: Readonly<Record<string, unknown>> | undefined,
  resolvePageTypeId?: PageTypeIdBySlug
): ViewDataJSON | undefined {
  if (properties === undefined) return undefined
  if (isFileSpelledView(properties)) return viewDataFromFile(properties, resolvePageTypeId)
  const config = properties.config
  if (config == null) return undefined
  const parsed = parseViewDataJSON(config)
  return parsed.ok ? parsed.data : undefined
}
