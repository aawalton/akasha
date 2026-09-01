"use client"

import { flattenRow } from "@akasha/pages-access/routing-core"
import type { Page } from "@akasha/pages-core/page-types"
import {
  useAcquireFilteredStream,
  useAcquireSlug,
  useAcquireSlugs,
  usePipelineLive,
} from "@akasha/pages-ui/cache/tanstack-live"
import { useCoreDefinitionsReady } from "@akasha/pages-ui/cache/use-core-definitions-ready"
import { createViewPipeline, type ViewResult } from "@akasha/pages-ui-store/query/view-pipeline"
import type { UseViewQueryOptions } from "@akasha/pages-ui-store/sql/options"
import { noOp } from "@akasha/utils-narrow/no-op"
import { useMemo } from "react"

export type UseViewQueryResult = {
  rows: readonly Page[]
  isLoading: boolean
  error: Error | null
  hasMore: boolean
  loadMore: () => void
  totalCount: number | null
  hydratedCount: number
  ensureHydratedUpTo: (target: number) => void
}

export function useViewQuery(options: UseViewQueryOptions): UseViewQueryResult {
  const slugAcquire = useAcquireSlug(options.crossType === true ? undefined : options.pageTypeSlug)
  const filteredAcquire = useAcquireFilteredStream(
    options.crossType === true ? options.crossTypeDescriptor : undefined
  )
  const acquire = options.crossType === true ? filteredAcquire : slugAcquire
  const gatingTargets = useAcquireSlugs(options.gatingTargetSlugs)
  useAcquireSlugs(options.displayTargetSlugs)
  const coreDefinitionsReady = useCoreDefinitionsReady()
  const depsKey = useMemo(() => JSON.stringify(options), [options])
  const { snapshot: result, error: readError } = usePipelineLive<ViewResult>(
    (collection) => createViewPipeline(collection, options),
    depsKey,
    coreDefinitionsReady
  )

  return useMemo(() => {
    const error = acquire.error ?? gatingTargets.error ?? readError
    if (error !== null) {
      return {
        rows: [],
        isLoading: false,
        error,
        hasMore: false,
        loadMore: noOp,
        totalCount: null,
        hydratedCount: 0,
        ensureHydratedUpTo: noOp,
      }
    }
    const isLoading =
      result === null || !gatingTargets.ready || (!acquire.ready && result.rows.length === 0)
    if (isLoading) {
      return {
        rows: [],
        isLoading: true,
        error: result?.error ?? null,
        hasMore: false,
        loadMore: noOp,
        totalCount: null,
        hydratedCount: 0,
        ensureHydratedUpTo: noOp,
      }
    }
    const rows: Page[] = result.rows.map((row) => flattenRow(row))
    return {
      rows,
      isLoading: false,
      error: result.error,
      hasMore: false,
      loadMore: noOp,
      totalCount: result.totalCount,
      hydratedCount: rows.length,
      ensureHydratedUpTo: noOp,
    }
  }, [acquire.ready, acquire.error, gatingTargets.ready, gatingTargets.error, readError, result])
}
