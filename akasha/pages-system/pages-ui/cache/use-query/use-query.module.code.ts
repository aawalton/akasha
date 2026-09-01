"use client"

import { flattenRow } from "@akasha/pages-access/routing-core"
import type { Page } from "@akasha/pages-core/page-types"
import { useAcquireSlug, usePipelineLive } from "@akasha/pages-ui/cache/tanstack-live"
import {
  createRegularPipeline,
  type RegularResult,
} from "@akasha/pages-ui-store/query/regular-pipeline"
import type { UsePagesOptions } from "@akasha/pages-ui-store/sql/options"
import { noOp } from "@akasha/utils-narrow/no-op"
import { useMemo } from "react"

export type UsePagesResult = {
  rows: readonly Page[]
  isLoading: boolean
  isDegraded: boolean
  error: Error | null
  hasMore: boolean
  loadMore: () => void
  totalCount: number | null
}

export function useQuery(options: UsePagesOptions): UsePagesResult {
  const acquire = useAcquireSlug(options.pageTypeSlug)
  const depsKey = useMemo(() => JSON.stringify(options), [options])
  const { snapshot: result, error: readError } = usePipelineLive<RegularResult>(
    (collection) => createRegularPipeline(collection, options),
    depsKey,
    true
  )

  return useMemo(() => {
    const error = acquire.error ?? readError
    if (error !== null) {
      return {
        rows: [],
        isLoading: false,
        isDegraded: false,
        error,
        hasMore: false,
        loadMore: noOp,
        totalCount: null,
      }
    }
    const isLoading = result === null || (!acquire.ready && result.rows.length === 0)
    if (isLoading) {
      return {
        rows: [],
        isLoading: true,
        isDegraded: false,
        error: result?.error ?? null,
        hasMore: false,
        loadMore: noOp,
        totalCount: null,
      }
    }
    const rows: Page[] = result.rows.map((row) => flattenRow(row))
    return {
      rows,
      isLoading: false,
      isDegraded: acquire.degraded && rows.length === 0,
      error: result.error,
      hasMore: false,
      loadMore: noOp,
      totalCount: result.totalCount,
    }
  }, [acquire.ready, acquire.degraded, acquire.error, readError, result])
}
