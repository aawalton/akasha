"use client"

import type { PageOrder } from "@akasha/pages-access/types"
import type { PageCondition, PageWhere } from "@akasha/pages-core/page-types"
import type { PageTypePropertiesMap } from "@akasha/pages-core/property-types/rollup"
import { getCrossTypePredicate } from "@akasha/pages-core/schema/cross-type-predicates"
import type { ViewDataJSON } from "@akasha/pages-core/schema/view-data"
import type { PropertyDefinition } from "@akasha/pages-core/types"
import {
  adjustTotalForClientFilters,
  applyClientViewFilters,
} from "@akasha/pages-ui/supabase/apply-client-view-filters"
import {
  type PageWithProperties,
  toPageWithProperties,
} from "@akasha/pages-ui/supabase/page-with-properties"
import { useViewPagesSupabase } from "@akasha/pages-ui/supabase/use-view-pages"
import { viewFilterToCondition } from "@akasha/pages-ui/supabase/view-filter-to-condition"
import type { ShapeDescriptor } from "@akasha/pages-ui-store/collection/shape-descriptor"
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
  }, [crossPredicate, viewConfig?.filters, properties, pageTypeId, propertiesByPageType])

  const crossTypeDescriptor = useMemo<ShapeDescriptor | undefined>(() => {
    if (crossPredicate === undefined) return undefined
    return {
      shapeKey: `cross:${crossPredicate.key}`,
    }
  }, [crossPredicate])

  const resolveKeys = useMemo<readonly string[] | undefined>(() => {
    if (!properties || properties.length === 0) return undefined
    const resolvableIds = properties
      .filter((p) => p.type === "rollup" || p.type === "aggregate")
      .map((p) => p.id)
    if (resolvableIds.length === 0) return undefined
    const visible = viewConfig?.visible_properties
    const filtered = visible ? resolvableIds.filter((id) => visible.includes(id)) : resolvableIds
    return filtered.length > 0 ? filtered : undefined
  }, [properties, viewConfig?.visible_properties])

  const result = useViewPagesSupabase({
    pageTypeId,
    pageTypeSlug,
    sorts,
    filters,
    resolveKeys,
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
        properties,
        pageTypeId,
        propertiesByPageType
      ),
    [
      result.rows,
      crossPredicate?.filters,
      viewConfig?.filters,
      properties,
      pageTypeId,
      propertiesByPageType,
    ]
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
