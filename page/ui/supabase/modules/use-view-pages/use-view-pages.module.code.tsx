"use client"

import type {
  GetPagesForViewArgs,
  GetPagesForViewResult,
} from "akasha/page/access/modules/get-for-view/get-for-view.module.code.ts"
import type {
  PageTypePropertiesMap,
  PropertyDefinition,
} from "akasha/page/core/modules/page-data/page-data.module.code.ts"
import { useViewQuery } from "akasha/page/ui/cache/modules/use-view-query/use-view-query.module.code.ts"
import type { ShapeDescriptor } from "akasha/page/ui-store/collection/modules/shape-descriptor/shape-descriptor.module.code.ts"

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
