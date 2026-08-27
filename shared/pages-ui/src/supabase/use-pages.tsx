"use client"

import type { PageOrder, PageSelect } from "@shared/pages-access/types"
import type { Page, PageWhere } from "@shared/pages-core/page-types"
import { useQuery } from "../cache/use-query"

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

export function usePagesSupabase(options: UsePagesSupabaseOptions): UsePagesSupabaseResult {
  return useQuery(options)
}
