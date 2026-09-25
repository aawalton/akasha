"use client"

import { flattenRow } from "akasha/page/access/modules/routing-core/routing-core.module.code.ts"
import { NEVER_MATCH_VALUE } from "akasha/page/access/modules/sentinels/sentinels.module.code.ts"
import {
  useAcquireFilteredStream,
  usePipelineLive,
} from "akasha/page/ui/cache/modules/tanstack-live/tanstack-live.module.code.ts"
import {
  type PageWithProperties,
  toPageWithProperties,
} from "akasha/page/ui/supabase/modules/page-with-properties/page-with-properties.module.code.ts"
import { namedShapeDescriptor } from "akasha/page/ui-store/collection/modules/shape-descriptor/shape-descriptor.module.code.ts"
import type { UsePagesOptions } from "akasha/page/ui-store/query/modules/options/options.module.code.ts"
import {
  createRegularPipeline,
  type RegularResult,
} from "akasha/page/ui-store/query/modules/regular-pipeline/regular-pipeline.module.code.ts"
import type { PageTypeSlug } from "akasha/page/url/modules/page-type-slug/page-type-slug.module.code.ts"
import { useMemo } from "react"

export function usePage({
  pageTypeSlug,
  id,
}: {
  pageTypeSlug: PageTypeSlug
  id: string | undefined
}): {
  page: PageWithProperties | null
  isLoading: boolean
} {
  const shape = useMemo(
    () => (id == null ? undefined : namedShapeDescriptor(pageTypeSlug, { by: "id", values: [id] })),
    [pageTypeSlug, id]
  )
  const acquire = useAcquireFilteredStream(shape)
  const options = useMemo<UsePagesOptions>(
    () => ({ pageTypeSlug, where: [{ key: "id", eq: id ?? NEVER_MATCH_VALUE }], limit: 1 }),
    [pageTypeSlug, id]
  )
  const { snapshot } = usePipelineLive<RegularResult>(
    (collection) => createRegularPipeline(collection, options),
    JSON.stringify(options),
    true
  )
  const row = snapshot?.rows[0]
  const page = useMemo(
    () => (row === undefined ? null : toPageWithProperties(flattenRow(row))),
    [row]
  )
  const isLoading = id != null && page === null && (snapshot === null || !acquire.ready)
  return { page, isLoading }
}
