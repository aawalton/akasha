"use client"

import { flattenRow } from "@shared/pages-access/routing-core"
import { type Page } from "@shared/pages-core/page-types"
import { createViewPipeline, type ViewResult } from "@shared/pages-ui-store/query/view-pipeline"
import { type UseViewQueryOptions } from "@shared/pages-ui-store/sql/options"
import { useMemo } from "react"
import {
  useAcquireFilteredStream,
  useAcquireSlug,
  useAcquireSlugs,
  usePipelineLive,
} from "./tanstack-live"
import { useCoreDefinitionsReady } from "./use-core-definitions-ready"


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

const NOOP_LOAD_MORE = (): undefined => undefined
const NOOP_ENSURE = (_target: number): undefined => undefined

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
        loadMore: NOOP_LOAD_MORE,
        totalCount: null,
        hydratedCount: 0,
        ensureHydratedUpTo: NOOP_ENSURE,
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
        loadMore: NOOP_LOAD_MORE,
        totalCount: null,
        hydratedCount: 0,
        ensureHydratedUpTo: NOOP_ENSURE,
      }
    }
    const rows: Page[] = result.rows.map((row) => flattenRow(row))
    return {
      rows,
      isLoading: false,
      error: result.error,
      hasMore: false,
      loadMore: NOOP_LOAD_MORE,
      totalCount: result.totalCount,
      hydratedCount: rows.length,
      ensureHydratedUpTo: NOOP_ENSURE,
    }
  }, [acquire.ready, acquire.error, gatingTargets.ready, gatingTargets.error, readError, result])
}
