"use client"

import type { PageOrder } from "akasha/page/access/modules/types/types.module.code.ts"
import type {
  PageTypePropertiesMap,
  PropertyDefinition,
} from "akasha/page/core/modules/page-data/page-data.module.code.ts"
import type {
  PageCondition,
  PageWhere,
} from "akasha/page/core/modules/page-types/page-types.module.code.ts"
import { getCrossTypePredicate } from "akasha/page/core/schema/modules/cross-type-predicates/cross-type-predicates.module.code.ts"
import type { ViewDataJSON } from "akasha/page/core/schema/modules/view-data/view-data.module.code.ts"
import {
  adjustTotalForClientFilters,
  applyClientViewFilters,
} from "akasha/page/ui/supabase/modules/apply-client-view-filters/apply-client-view-filters.module.code.ts"
import {
  type PageWithProperties,
  toPageWithProperties,
} from "akasha/page/ui/supabase/modules/page-with-properties/page-with-properties.module.code.ts"
import { useViewPagesSupabase } from "akasha/page/ui/supabase/modules/use-view-pages/use-view-pages.module.code.tsx"
import { viewFilterToCondition } from "akasha/page/ui/supabase/modules/view-filter-to-condition/view-filter-to-condition.module.code.ts"
import type { ShapeDescriptor } from "akasha/page/ui-store/collection/modules/shape-descriptor/shape-descriptor.module.code.ts"
import { useMemo } from "react"

export function usePageViewQuery({
  pageTypeId,
  pageTypeSlug,
  viewConfig,
  properties,
  propertiesByPageType,
  viewId,
  viewUpdatedAt,
  gatingTargetSlugs,
  displayTargetSlugs,
}: {
  pageTypeId: string
  pageTypeSlug?: string
  viewConfig?: ViewDataJSON
  properties?: readonly PropertyDefinition[]
  propertiesByPageType?: PageTypePropertiesMap
  viewId?: string
  viewUpdatedAt?: string
  gatingTargetSlugs?: readonly string[]
  displayTargetSlugs?: readonly string[]
}): {
  pages: readonly PageWithProperties[]
  isLoading: boolean
  error: Error | null
  hasMore: boolean
  loadMore: () => void
  totalCount: number | null
  hydratedCount: number
  ensureHydratedUpTo: (target: number) => void
} {
  const crossPredicate = useMemo(() => {
    const key = viewConfig?.crossTypeSource?.predicateKey
    return key != null ? getCrossTypePredicate(key) : undefined
  }, [viewConfig?.crossTypeSource?.predicateKey])

  const sorts = useMemo<PageOrder | undefined>(() => {
    const sortsList = crossPredicate?.sorts ?? viewConfig?.sorts
    if (sortsList == null || sortsList.length === 0) return undefined
    const out: { by: string; dir: "asc" | "desc" }[] = []
    for (const s of sortsList) {
      const by = String(s.field ?? "")
      const dir = s.direction === "asc" || s.direction === "desc" ? s.direction : "asc"
      if (by === "") continue
      out.push({ by, dir })
    }
    return out.length > 0 ? out : undefined
  }, [crossPredicate, viewConfig?.sorts])

  const filters = useMemo<PageWhere | undefined>(() => {
    const filterList = crossPredicate?.filters ?? viewConfig?.filters
    if (filterList == null || filterList.length === 0) return undefined
    const out: PageCondition[] = []
    for (const f of filterList) {
      const def = properties?.find((p) => p.id === f.propertyId)
      const conds = viewFilterToCondition(f.propertyId, f.operator, f.value, def)
      if (conds) out.push(...conds)
    }
    return out.length > 0 ? out : undefined
  }, [crossPredicate, viewConfig?.filters, properties])

  const crossTypeDescriptor = useMemo<ShapeDescriptor | undefined>(() => {
    if (crossPredicate === undefined) return undefined
    return {
      shapeKey: `cross:${crossPredicate.key}`,
    }
  }, [crossPredicate])

  const result = useViewPagesSupabase({
    pageTypeId,
    pageTypeSlug,
    sorts,
    filters,
    properties,
    propertiesByPageType,
    viewId,
    viewUpdatedAt,
    pageSize: viewConfig?.page_size,
    crossType: crossPredicate !== undefined,
    crossTypeDescriptor,
    limit: crossPredicate?.limit,
    gatingTargetSlugs,
    displayTargetSlugs,
  })
  const filteredRows = useMemo(
    () =>
      applyClientViewFilters(
        result.rows,
        crossPredicate?.filters ?? viewConfig?.filters,
        properties
      ),
    [result.rows, crossPredicate?.filters, viewConfig?.filters, properties]
  )
  const pages = useMemo(() => filteredRows.map((r) => toPageWithProperties(r)), [filteredRows])
  const totalCount = useMemo(
    () => adjustTotalForClientFilters(result.totalCount, result.rows.length, filteredRows.length),
    [result.totalCount, result.rows.length, filteredRows.length]
  )
  return {
    pages,
    isLoading: result.isLoading,
    error: result.error,
    hasMore: result.hasMore,
    loadMore: result.loadMore,
    totalCount,
    hydratedCount: filteredRows.length,
    ensureHydratedUpTo: result.ensureHydratedUpTo,
  }
}
