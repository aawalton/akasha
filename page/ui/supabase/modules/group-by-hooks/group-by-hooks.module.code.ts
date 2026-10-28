"use client"

import type { PageOrder } from "akasha/page/access/modules/types/types.module.code.ts"
import type { PropertyDefinition } from "akasha/page/core/modules/page-data/page-data.module.code.ts"
import type {
  Page,
  PageCondition,
  PageWhere,
} from "akasha/page/core/modules/page-types/page-types.module.code.ts"
import type {
  GroupGranularity,
  ViewFilter,
} from "akasha/page/core/schema/modules/view-data/view-data.module.code.ts"
import { getPageGroupDefinition } from "akasha/page/core/view/modules/apply-grouping/apply-grouping.module.code.ts"
import {
  GROUP_NONE_KEY,
  type PageGroupDefinition,
} from "akasha/page/core/view/modules/apply-grouping-shared/apply-grouping-shared.module.code.ts"
import {
  adjustTotalForClientFilters,
  applyClientViewFilters,
} from "akasha/page/ui/supabase/modules/apply-client-view-filters/apply-client-view-filters.module.code.ts"
import {
  type PageWithProperties,
  toPageWithProperties,
} from "akasha/page/ui/supabase/modules/page-with-properties/page-with-properties.module.code.ts"
import {
  type UsePagesSupabaseOptions,
  usePages,
} from "akasha/page/ui/supabase/modules/use-pages/use-pages.module.code.ts"
import { viewFilterToCondition } from "akasha/page/ui/supabase/modules/view-filter-to-condition/view-filter-to-condition.module.code.ts"
import { useMemo } from "react"

interface GroupByArgs {
  pageTypeSlug: string
  groupPropertyId: string
  sortPropertyId?: string
  sortDirection?: "asc" | "desc"
  filters?: readonly ViewFilter[]
  pageSize?: number
  properties?: readonly PropertyDefinition[]
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
    groupPropertyId,
    sortPropertyId,
    sortDirection,
    filters,
    pageSize,
    properties,
    groupGranularity,
  } = args

  const where = useMemo<PageWhere | undefined>(() => {
    if (filters == null || filters.length === 0) return undefined
    const out: PageCondition[] = []
    for (const f of filters) {
      const def = properties?.find((p) => p.id === f.propertyId)
      const conds = viewFilterToCondition(f.propertyId, f.operator, f.value, def)
      if (conds) out.push(...conds)
    }
    return out.length > 0 ? out : undefined
  }, [filters, properties])

  const order = useMemo<PageOrder | undefined>(() => {
    if (sortPropertyId == null) return undefined
    const dir = sortDirection === "asc" || sortDirection === "desc" ? sortDirection : "asc"
    return [{ by: sortPropertyId, dir }]
  }, [sortPropertyId, sortDirection])

  const options = useMemo<UsePagesSupabaseOptions>(
    () => ({ pageTypeSlug, where, order, limit: pageSize }),
    [pageTypeSlug, where, order, pageSize]
  )

  const result = usePages(options)

  const filteredRows = useMemo(
    () => applyClientViewFilters(result.rows, filters, properties),
    [result.rows, filters, properties]
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

function keysOf(definition: PageGroupDefinition | null, row: Page): readonly string[] {
  if (definition === null) return [GROUP_NONE_KEY]
  const groupable = { ...row, _id: row.id }
  return definition.getKeys?.(groupable) ?? [definition.getKey(groupable)]
}

export function bucketRowsByGroup(args: {
  rows: readonly Page[]
  groupPropertyId: string
  isLoading: boolean
  hasMore: boolean
  properties?: readonly PropertyDefinition[]
  groupGranularity?: GroupGranularity
}): Map<string, GroupEntry> {
  const definition = getPageGroupDefinition(
    args.groupPropertyId,
    args.properties ?? [],
    null,
    args.groupGranularity ?? "none"
  )
  const buckets = new Map<string, PageWithProperties[]>()
  for (const row of args.rows) {
    const keys = keysOf(definition, row)
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
