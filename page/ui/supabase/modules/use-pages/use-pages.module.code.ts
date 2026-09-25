"use client"

import type { PageOrder, PageSelect } from "akasha/page/access/modules/types/types.module.code.ts"
import type { Page, PageWhere } from "akasha/page/core/modules/page-types/page-types.module.code.ts"
import { useQuery } from "akasha/page/ui/cache/modules/use-query/use-query.module.code.ts"

export interface UsePagesSupabaseOptions {
  pageTypeSlug: string
  where?: PageWhere
  order?: PageOrder
  select?: PageSelect
  limit?: number
}

interface UsePagesSupabaseResult {
  rows: readonly Page[]
  isLoading: boolean
  isDegraded: boolean
  error: Error | null
  hasMore: boolean
  loadMore: () => void
  totalCount: number | null
}

export function usePages(options: UsePagesSupabaseOptions): UsePagesSupabaseResult {
  return useQuery(options)
}
