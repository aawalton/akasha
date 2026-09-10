"use client"

import type {
  GetPagesForViewArgs,
  GetPagesForViewResult,
} from "akasha/pages/access/get-for-view/get-for-view.module.code.ts"
import type { PropertyDefinition } from "akasha/pages/core/page-data/page-data.module.code.ts"
import type { PageTypePropertiesMap } from "akasha/pages/core/property-types/rollup/rollup.module.code.ts"
import { useViewQuery } from "akasha/pages/ui/cache/use-view-query/use-view-query.module.code.ts"
import type { ShapeDescriptor } from "akasha/pages/ui-store/collection/shape-descriptor/shape-descriptor.module.code.ts"

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
