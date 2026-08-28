"use client"

import type { PageOrder } from "@shared/pages-access/types"
import type { Page, PageCondition, PageWhere } from "@shared/pages-core/page-types"
import { type PageTypePropertiesMap } from "@shared/pages-core/property-types/rollup"
import { type GroupGranularity, type ViewFilter } from "@shared/pages-core/schema/view-data"
import { type PropertyDefinition } from "@shared/pages-core/types"
import { GROUP_NONE_KEY } from "@shared/pages-core/view/apply-grouping-shared"
import { pageDayKey } from "@shared/pages-core/view/calendar-date-to-value"
import { applyGranularityBucket } from "@shared/pages-core/view/group-granularity"
import { useMemo } from "react"
import { adjustTotalForClientFilters, applyClientViewFilters } from "./apply-client-view-filters.ts"
import { type PageWithProperties, toPageWithProperties } from "./types.ts"
import { type UsePagesSupabaseOptions, usePagesSupabase } from "./use-pages.tsx"
import { viewFilterToCondition } from "./view-filter-to-condition.ts"

interface GroupByArgs {
  pageTypeSlug: string
  pageTypeId?: string
  groupPropertyId: string
  sortPropertyId?: string
  sortDirection?: "asc" | "desc"
  filters?: readonly ViewFilter[]
  pageSize?: number
  properties?: readonly PropertyDefinition[]
  propertiesByPageType?: PageTypePropertiesMap
  target?: number
  groupGranularity?: GroupGranularity
}

interface GroupEntry {
  pages: readonly PageWithProperties[]
  isLoading: boolean
  canLoadMore: boolean
  totalCount: number | null
}

interface GroupByResult {
  groups: Map<string, GroupEntry>
  loadMore: (groupValue: string) => void
  isLoading: boolean
  totalCount: number | null
}

export function useGroupByPaginatedQuery(args: GroupByArgs): GroupByResult {
  const {
    pageTypeSlug,
    pageTypeId,
    groupPropertyId,
    sortPropertyId,
    sortDirection,
    filters,
    pageSize,
    properties,
    propertiesByPageType,
    groupGranularity,
  } = args

  const where = useMemo<PageWhere | undefined>(() => {
    if (filters == null || filters.length === 0) return undefined
    const out: PageCondition[] = []
    for (const f of filters) {
      const def = properties?.find((p) => p.id === f.propertyId)
      const conds = viewFilterToCondition(
        f.propertyId,
        f.operator,
        f.value,
        def,
        pageTypeId,
        propertiesByPageType
      )
      if (conds) out.push(...conds)
    }
    return out.length > 0 ? out : undefined
  }, [filters, properties, pageTypeId, propertiesByPageType])

  const order = useMemo<PageOrder | undefined>(() => {
    if (sortPropertyId == null) return undefined
    const dir = sortDirection === "asc" || sortDirection === "desc" ? sortDirection : "asc"
    return [{ by: sortPropertyId, dir }]
  }, [sortPropertyId, sortDirection])

  const options = useMemo<UsePagesSupabaseOptions>(
    () => ({ pageTypeSlug, where, order, limit: pageSize }),
    [pageTypeSlug, where, order, pageSize]
  )

  const result = usePagesSupabase(options)

  const filteredRows = useMemo(
    () =>
      applyClientViewFilters(result.rows, filters, properties, pageTypeId, propertiesByPageType),
    [result.rows, filters, properties, pageTypeId, propertiesByPageType]
  )

  const groups = useMemo(
    () =>
      bucketRowsByGroup({
        rows: filteredRows,
        groupPropertyId,
        isLoading: result.isLoading,
        hasMore: result.hasMore,
        properties,
        groupGranularity,
      }),
    [filteredRows, result.isLoading, result.hasMore, groupPropertyId, properties, groupGranularity]
  )

  const totalCount = useMemo(
    () => adjustTotalForClientFilters(result.totalCount, result.rows.length, filteredRows.length),
    [result.totalCount, result.rows.length, filteredRows.length]
  )

  return {
    groups,
    loadMore: () => result.loadMore(),
    isLoading: result.isLoading,
    totalCount,
  }
}

export function bucketRowsByGroup(args: {
  rows: readonly Page[]
  groupPropertyId: string
  isLoading: boolean
  hasMore: boolean
  properties?: readonly PropertyDefinition[]
  groupGranularity?: GroupGranularity
}): Map<string, GroupEntry> {
  const prop = args.properties?.find((p) => p.id === args.groupPropertyId)
  const isDateKey = prop?.type === "calendar-date" || prop?.type === "instant"
  const isMultiKey = prop?.type === "multi-relation" || prop?.type === "multi-select"
  const granularity = args.groupGranularity ?? "none"
  const buckets = new Map<string, PageWithProperties[]>()
  for (const row of args.rows) {
    const raw = row[args.groupPropertyId]
    const keys: string[] = []
    if (isDateKey && prop !== undefined) {
      const day = pageDayKey(prop, raw)
      keys.push(day === null ? GROUP_NONE_KEY : applyGranularityBucket(day, granularity))
    } else if (isMultiKey) {
      if (Array.isArray(raw) && raw.length > 0) {
        for (const el of raw) keys.push(String(el))
      } else {
        keys.push(GROUP_NONE_KEY)
      }
    } else {
      keys.push(raw == null || raw === "" ? GROUP_NONE_KEY : String(raw))
    }
    const page = toPageWithProperties(row)
    for (const key of keys) {
      let bucket = buckets.get(key)
      if (!bucket) {
        bucket = []
        buckets.set(key, bucket)
      }
      bucket.push(page)
    }
  }
  const out = new Map<string, GroupEntry>()
  for (const [key, pages] of buckets) {
    out.set(key, {
      pages,
      isLoading: args.isLoading,
      canLoadMore: args.hasMore,
      totalCount: pages.length,
    })
  }
  return out
}
