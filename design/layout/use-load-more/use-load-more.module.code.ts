"use client"

import { useCallback, useEffect, useMemo, useRef, useState } from "react"

interface UseLoadMoreOptions {
  totalCount: number
  pageSize?: number
  initialVisibleCount?: number
  resetKey?: string
  onServerLoadMore?: () => void
  canServerLoadMore?: boolean
  serverPrefetchPages?: number
}

interface UseLoadMoreReturn {
  visibleCount: number
  hasMore: boolean
  loadMore: () => undefined
  initialVisibleCount: number
}

export function useLoadMore({
  totalCount,
  pageSize = 24,
  initialVisibleCount,
  resetKey,
  onServerLoadMore,
  canServerLoadMore,
  serverPrefetchPages = 1,
}: UseLoadMoreOptions): UseLoadMoreReturn {
  const resolvedInitial = Math.max(initialVisibleCount ?? pageSize, pageSize)
  const [visibleCount, setVisibleCount] = useState(resolvedInitial)

  const prevResetKeyRef = useRef(resetKey)
  useEffect(() => {
    if (prevResetKeyRef.current === resetKey) return
    prevResetKeyRef.current = resetKey
    setVisibleCount(pageSize)
  }, [resetKey, pageSize])

  const onServerLoadMoreRef = useRef(onServerLoadMore)
  onServerLoadMoreRef.current = onServerLoadMore
  useEffect(() => {
    if (
      canServerLoadMore &&
      onServerLoadMoreRef.current &&
      visibleCount + serverPrefetchPages * pageSize >= totalCount
    ) {
      onServerLoadMoreRef.current()
    }
  }, [visibleCount, totalCount, pageSize, canServerLoadMore, serverPrefetchPages])

  const loadMore = useCallback((): undefined => {
    setVisibleCount((prev) => Math.min(prev + pageSize, totalCount))
  }, [pageSize, totalCount])

  const hasMore = visibleCount < totalCount || (canServerLoadMore ?? false)

  return useMemo(
    () => ({
      visibleCount: Math.min(visibleCount, totalCount),
      hasMore,
      loadMore,
      initialVisibleCount: resolvedInitial,
    }),
    [visibleCount, totalCount, hasMore, loadMore, resolvedInitial]
  )
}
