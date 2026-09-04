"use client"

import type { GetPagesForViewArgs, GetPagesForViewResult } from "@akasha/pages-access/get-for-view"
import type { PageTypePropertiesMap } from "@akasha/pages-core/property-types/rollup"
import type { PropertyDefinition } from "@akasha/pages-core/types"
import { useViewQuery } from "@akasha/pages-ui/cache/use-view-query"
import type { ShapeDescriptor } from "@akasha/pages-ui-store/collection/shape-descriptor"

export type UseViewPagesSupabaseOptions = Omit<GetPagesForViewArgs, "cursor"> & {
  pageTypeSlug?: string
  properties?: readonly PropertyDefinition[]
  propertiesByPageType?: PageTypePropertiesMap
  viewId?: string
  viewUpdatedAt?: string
  pageSize?: number
  crossType?: boolean
  crossTypeDescriptor?: ShapeDescriptor
  gatingTargetSlugs?: readonly string[]
  displayTargetSlugs?: readonly string[]
}

export type UseViewPagesSupabaseResult = Pick<GetPagesForViewResult, "rows"> & {
  isLoading: boolean
  error: Error | null
  hasMore: boolean
  loadMore: () => void
  totalCount: number | null
  hydratedCount: number
  ensureHydratedUpTo: (target: number) => void
}

export function useViewPagesSupabase(
  options: UseViewPagesSupabaseOptions
): UseViewPagesSupabaseResult {
  return useViewQuery(options)
}
