"use client"

import { noOp } from "akasha/code/type/narrowing/modules/no-op/no-op.module.code.ts"
import { flattenRow } from "akasha/page/access/modules/routing-core/routing-core.module.code.ts"
import type { Page } from "akasha/page/core/modules/page-types/page-types.module.code.ts"
import {
  useAcquireSlug,
  usePipelineLive,
} from "akasha/page/ui/cache/modules/tanstack-live/tanstack-live.module.code.ts"
import {
  createRegularPipeline,
  type RegularResult,
} from "akasha/page/ui-store/query/modules/regular-pipeline/regular-pipeline.module.code.ts"
import type { UsePagesOptions } from "akasha/page/ui-store/sql/modules/options/options.module.code.ts"
import { useMemo } from "react"

type UsePagesResult = {
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
