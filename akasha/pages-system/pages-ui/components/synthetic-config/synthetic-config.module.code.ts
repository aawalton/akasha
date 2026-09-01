import type {
  GroupGranularity,
  ViewConfig,
  ViewDataJSON,
  ViewFilter,
  ViewGroupSort,
  ViewSort,
} from "@akasha/pages-core/schema/view-data"
import { GROUP_GRANULARITIES } from "@akasha/pages-core/schema/view-data"
import { isRecord } from "@akasha/utils-narrow/is-record"
import { z } from "zod"

const Q_MAX_LEN = 200

const RESERVED_VIEW_PARAMS = new Set([
  "filters",
  "sorts",
  "groups",
  "groupSorts",
  "groupGranularity",
  "pageSize",
  "groupPageSize",
  "itemPageSize",
  "q",
])

export function buildBaseFilters(searchParams: Record<string, string>): readonly ViewFilter[] {
  const filters: ViewFilter[] = []
  for (const [key, value] of Object.entries(searchParams)) {
    if (RESERVED_VIEW_PARAMS.has(key)) continue
    const parts = value
      .split(",")
      .map((s) => s.trim())
      .filter((s) => s.length > 0)
    if (parts.length === 0) continue
    if (parts.length === 1) {
      filters.push({ propertyId: key, operator: "equals", value: parts[0] })
    } else {
      filters.push({ propertyId: key, operator: "includes", value: parts })
    }
  }
  return filters
}

function isViewFilter(value: unknown): value is ViewFilter {
  return (
    isRecord(value) && typeof value.propertyId === "string" && typeof value.operator === "string"
  )
}

function isViewSort(value: unknown): value is ViewSort {
  return (
    isRecord(value) &&
    typeof value.field === "string" &&
    (value.direction === "asc" || value.direction === "desc")
  )
}

function parseJsonUnknown(raw: string | undefined): unknown {
  if (raw == null) return undefined
  try {
    return z.unknown().parse(JSON.parse(raw))
  } catch {
    return undefined
  }
}

function parseViewFilters(raw: string | undefined): readonly ViewFilter[] {
  const value = parseJsonUnknown(raw)
  if (!Array.isArray(value)) return []
  return value.filter(isViewFilter)
}

function parseViewSorts(raw: string | undefined): readonly ViewSort[] | undefined {
  const value = parseJsonUnknown(raw)
  if (!Array.isArray(value)) return undefined
  return value.filter(isViewSort)
}

function parseViewGroupSorts(raw: string | undefined): readonly ViewGroupSort[] | undefined {
  return parseViewSorts(raw)
}

function parseGroupGranularity(raw: string | undefined): GroupGranularity | undefined {
  if (raw == null) return undefined
  return GROUP_GRANULARITIES.find((g) => g === raw)
}

export function viewConfigToListingParams(
  config: ViewConfig,
  searchParams: Record<string, string>,
  baseFilters: readonly ViewFilter[]
): URLSearchParams {
  const params = new URLSearchParams()

  for (const [key, value] of Object.entries(searchParams)) {
    if (RESERVED_VIEW_PARAMS.has(key)) continue
    params.set(key, value)
  }

  const qParam = searchParams.q
  if (typeof qParam === "string" && qParam.length > 0) params.set("q", qParam)

  const allFilters = config.filters ?? []
  const trimmedQ = typeof qParam === "string" ? qParam.trim().slice(0, Q_MAX_LEN) : ""
  const userFilters = allFilters.filter((f) => {
    if (
      trimmedQ.length > 0 &&
      f.propertyId === "title" &&
      f.operator === "contains" &&
      f.value === trimmedQ
    ) {
      return false
    }
    return !baseFilters.some(
      (bf) => bf.propertyId === f.propertyId && bf.operator === f.operator && bf.value === f.value
    )
  })
  if (userFilters.length > 0) params.set("filters", JSON.stringify(userFilters))
  if (config.sorts && config.sorts.length > 0) params.set("sorts", JSON.stringify(config.sorts))
  if (config.groupBy != null) params.set("groups", config.groupBy)
  if (config.groupGranularity != null) params.set("groupGranularity", config.groupGranularity)
  if (config.groupSorts && config.groupSorts.length > 0) {
    params.set("groupSorts", JSON.stringify(config.groupSorts))
  }
  if (typeof config.pageSize === "number") params.set("pageSize", String(config.pageSize))
  if (typeof config.groupPageSize === "number") {
    params.set("groupPageSize", String(config.groupPageSize))
  }
  if (typeof config.itemPageSize === "number") {
    params.set("itemPageSize", String(config.itemPageSize))
  }

  return params
}

export function buildSyntheticConfig(
  searchParams: Record<string, string>,
  baseFilters: readonly ViewFilter[]
): ViewDataJSON {
  const userFilters = parseViewFilters(searchParams.filters)
  const sorts = searchParams.sorts != null ? parseViewSorts(searchParams.sorts) : undefined
  const groupSorts =
    searchParams.groupSorts != null ? parseViewGroupSorts(searchParams.groupSorts) : undefined

  const qFilters: ViewFilter[] = []
  if (typeof searchParams.q === "string") {
    const trimmed = searchParams.q.trim().slice(0, Q_MAX_LEN)
    if (trimmed.length > 0) {
      qFilters.push({ propertyId: "title", operator: "contains", value: trimmed })
    }
  }

  const allFilters = [...baseFilters, ...userFilters, ...qFilters]

  const parsePositiveInt = (raw: string | undefined): number | undefined => {
    if (raw == null) return undefined
    const n = Number.parseInt(raw, 10)
    return Number.isFinite(n) && n > 0 ? n : undefined
  }

  return {
    version: 1,
    filters: allFilters.length > 0 ? allFilters : undefined,
    sorts,
    group_by:
      searchParams.groups != null && searchParams.groups.length > 0
        ? searchParams.groups
        : undefined,
    group_granularity: parseGroupGranularity(searchParams.groupGranularity),
    group_sorts: groupSorts,
    page_size: parsePositiveInt(searchParams.pageSize),
    group_page_size: parsePositiveInt(searchParams.groupPageSize),
    item_page_size: parsePositiveInt(searchParams.itemPageSize),
  } satisfies ViewDataJSON
}
