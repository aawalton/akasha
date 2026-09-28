"use client"

import { noOp } from "akasha/code/type/narrowing/modules/no-op/no-op.module.code.ts"
import { flattenRow } from "akasha/page/access/modules/routing-core/routing-core.module.code.ts"
import type { Page } from "akasha/page/core/modules/page-types/page-types.module.code.ts"
import { createHeldSnapshots } from "akasha/page/ui/cache/modules/listing-readiness/listing-readiness.module.code.ts"
import {
  useAcquireFilteredStream,
  useAcquireShapes,
  useAcquireSlug,
  useAcquireSlugs,
  usePipelineLive,
} from "akasha/page/ui/cache/modules/tanstack-live/tanstack-live.module.code.ts"
import { useCoreDefinitionsReady } from "akasha/page/ui/cache/modules/use-core-definitions-ready/use-core-definitions-ready.module.code.ts"
import type { ShapeDescriptor } from "akasha/page/ui-store/collection/modules/shape-descriptor/shape-descriptor.module.code.ts"
import type { UseViewQueryOptions } from "akasha/page/ui-store/query/modules/options/options.module.code.ts"
import {
  createViewPipeline,
  type ViewResult,
} from "akasha/page/ui-store/query/modules/view-pipeline/view-pipeline.module.code.ts"
import { useMemo } from "react"

type UseViewQueryResult = {
  rows: readonly Page[]
  isLoading: boolean
  error: Error | null
  hasMore: boolean
  loadMore: () => void
  totalCount: number | null
  hydratedCount: number
  ensureHydratedUpTo: (target: number) => void
}

const HELD_VIEWS = 256

const HELD = createHeldSnapshots<ViewResult>(HELD_VIEWS)

const NO_SHAPES: readonly ShapeDescriptor[] = []

export function useViewQuery(options: UseViewQueryOptions): UseViewQueryResult {
  const crossType = options.crossType === true
  const shapes = crossType ? NO_SHAPES : (options.shapes ?? NO_SHAPES)
  const named = crossType || shapes.length > 0
  const slugAcquire = useAcquireSlug(named ? undefined : options.pageTypeSlug)
  const crossAcquire = useAcquireFilteredStream(crossType ? options.crossTypeDescriptor : undefined)
  const shapesAcquire = useAcquireShapes(shapes)
  const acquire = crossType
    ? crossAcquire
    : shapes.length > 0
      ? { ready: shapesAcquire.ready, error: null }
      : slugAcquire
  const gatingTargets = useAcquireSlugs(options.gatingTargetSlugs)
  useAcquireSlugs(options.displayTargetSlugs)
  const coreDefinitionsReady = useCoreDefinitionsReady()
  const depsKey = useMemo(() => JSON.stringify(options), [options])
  const { snapshot: result, error: readError } = usePipelineLive<ViewResult>(
    (collection) => createViewPipeline(collection, options),
    depsKey,
    coreDefinitionsReady,
    HELD
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
    if (result === null || !gatingTargets.ready || !acquire.ready) {
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
