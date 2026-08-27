"use client"

import type { GetPagesForViewArgs, GetPagesForViewResult } from "@shared/pages-access/get-for-view"
import type { PageTypePropertiesMap } from "@shared/pages-core/property-types/rollup"
import type { PropertyDefinition } from "@shared/pages-core/types"
import type { ShapeDescriptor } from "@shared/pages-ui-store/collection/shape-descriptor"
import { useViewQuery } from "../cache/use-view-query"

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
