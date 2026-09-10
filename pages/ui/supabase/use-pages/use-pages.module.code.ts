"use client"

import type { PageOrder, PageSelect } from "akasha/pages/access/types/types.module.code.ts"
import type { Page, PageWhere } from "akasha/pages/core/page-types/page-types.module.code.ts"
import { useQuery } from "akasha/pages/ui/cache/use-query/use-query.module.code.ts"

export interface UsePagesSupabaseOptions {
  pageTypeSlug: string
  where?: PageWhere
  order?: PageOrder
  select?: PageSelect
  limit?: number
}

export interface UsePagesSupabaseResult {
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
