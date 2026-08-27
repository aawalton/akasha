"use client"

import { NEVER_MATCH_VALUE } from "@shared/pages-access/sentinels"
import { type PageCondition, type PageWhere } from "@shared/pages-core/page-types"
import { useMemo } from "react"
import { useQuery } from "../cache/use-query"
import { type PageWithProperties, toPageWithProperties } from "./types"

interface RelationPickerArgs {
  pageTypeSlug: string
  pageTypeIds: readonly string[] | undefined
  searchTerm?: string
  enabled?: boolean
  pageSize?: number
}

interface RelationPickerResult {
  pages: readonly PageWithProperties[]
  loadMore: () => void
  canLoadMore: boolean
  isLoading: boolean
}

export function usePaginatedRelationPicker(args: RelationPickerArgs): RelationPickerResult {
  const { pageTypeSlug, pageTypeIds, searchTerm, enabled = true, pageSize } = args

  const sortedKey = useMemo(
    () => (pageTypeIds ? [...pageTypeIds].sort().join(",") : ""),
    [pageTypeIds]
  )
  const stableIds = useMemo(() => (pageTypeIds ? [...pageTypeIds].sort() : []), [sortedKey])

  const isActive = enabled && stableIds.length > 0

  const where = useMemo<PageWhere>(() => {
    if (!isActive) return [{ key: "id", eq: NEVER_MATCH_VALUE }]
    const conditions: PageCondition[] = [{ key: "pageTypeId", in: [...stableIds] }]
    if (searchTerm != null && searchTerm.length > 0) {
      conditions.push({ key: "title", contains: searchTerm })
    }
    return conditions
  }, [isActive, stableIds, searchTerm])

  const result = useQuery({
    pageTypeSlug,
    where,
    ...(pageSize != null ? { limit: pageSize } : {}),
  })

  const pages = useMemo<PageWithProperties[]>(
    () => result.rows.map((r) => toPageWithProperties(r)),
    [result.rows]
  )

  return {
    pages: isActive ? pages : [],
    loadMore: result.loadMore,
    canLoadMore: isActive && result.hasMore,
    isLoading: isActive && result.isLoading,
  }
}
