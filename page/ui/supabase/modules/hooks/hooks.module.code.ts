"use client"

import { flattenRow } from "akasha/page/access/modules/routing-core/routing-core.module.code.ts"
import { NEVER_MATCH_VALUE } from "akasha/page/access/modules/sentinels/sentinels.module.code.ts"
import type { PageWhere } from "akasha/page/core/modules/page-types/page-types.module.code.ts"
import {
  readTargetPageTypeId,
  readTargetPageTypeSlug,
} from "akasha/page/core/property-type/modules/relation/relation.module.code.ts"
import { namedAs } from "akasha/page/modules/address/page-address.module.code.ts"
import {
  useAcquireSlug,
  useAcquireSlugs,
  usePipelineLive,
} from "akasha/page/ui/cache/modules/tanstack-live/tanstack-live.module.code.ts"
import {
  collectRelatedIds,
  RELATED_IDS_PER_PROPERTY_CAP,
  type RelationSpec,
} from "akasha/page/ui/supabase/modules/collect-related-ids/collect-related-ids.module.code.ts"
import {
  type PageWithProperties,
  toPageWithProperties,
} from "akasha/page/ui/supabase/modules/page-with-properties/page-with-properties.module.code.ts"
import {
  type UsePagesSupabaseOptions,
  usePages,
} from "akasha/page/ui/supabase/modules/use-pages/use-pages.module.code.ts"
import {
  createIdSuffixPipeline,
  type IdSuffixResult,
} from "akasha/page/ui-store/query/modules/id-suffix-pipeline/id-suffix-pipeline.module.code.ts"
import { createRelatedPipeline } from "akasha/page/ui-store/query/modules/related-pipeline/related-pipeline.module.code.ts"
import type { PageTypeSlug } from "akasha/page/url/modules/page-type-slug/page-type-slug.module.code.ts"
import { useEffect, useMemo } from "react"

const NAV = "nav"

const VIEW = "view"

const PAGE_TYPE = "page-type"

const PAGE_TYPE_KEY = "pageType"

function targetSlugOf(
  config: unknown,
  pageTypeSlugById: ReadonlyMap<string, string>
): string | undefined {
  const named = readTargetPageTypeSlug(config)
  if (named !== undefined) return named
  const targetPageTypeId = readTargetPageTypeId(config)
  return targetPageTypeId === undefined ? undefined : pageTypeSlugById.get(targetPageTypeId)
}

export function usePageByIdSuffix({
  pageTypeSlug,
  idSuffix,
  slug,
}: {
  pageTypeSlug: PageTypeSlug
  idSuffix: string | undefined
  slug?: string
}): {
  page: PageWithProperties | null
  isLoading: boolean
} {
  const acquire = useAcquireSlug(idSuffix == null ? undefined : pageTypeSlug)
  const enabled = idSuffix != null
  const options = useMemo(
    () => ({ pageTypeSlug, idSuffix: idSuffix ?? "" }),
    [pageTypeSlug, idSuffix]
  )
  const depsKey = useMemo(() => JSON.stringify(options), [options])
  const { snapshot: result, error: readError } = usePipelineLive<IdSuffixResult>(
    (collection) => createIdSuffixPipeline(collection, options),
    depsKey,
    enabled
  )

  const page = useMemo<PageWithProperties | null>(() => {
    if (!enabled || idSuffix == null || result === null) return null
    const matches = result.rows
    if (matches.length === 0) return null
    if (matches.length === 1) {
      const only = matches[0]
      if (only === undefined) return null
      return toPageWithProperties(flattenRow(only))
    }
    const flat = matches.map((r) => flattenRow(r))
    if (slug !== undefined) {
      const only = flat.find((p) => p.slug === slug)
      if (only !== undefined) return toPageWithProperties(only)
    }
    const fallback = flat[0]
    if (fallback === undefined) return null
    return toPageWithProperties(fallback)
  }, [enabled, idSuffix, result, slug])

  const isLoading =
    idSuffix != null &&
    readError === null &&
    (result === null || (!acquire.ready && result.rows.length === 0))
  return { page, isLoading }
}

export function useAllPages({ pageTypeSlug }: { pageTypeSlug: string }): {
  pages: readonly PageWithProperties[]
  isLoading: boolean
  isDegraded: boolean
  error: Error | null
} {
  const result = usePages({ pageTypeSlug })
  const { error, hasMore, isDegraded, isLoading, loadMore } = result
  useEffect(() => {
    if (hasMore && !isLoading) loadMore()
  }, [hasMore, isLoading, loadMore])
  const pages = useMemo(() => result.rows.map((r) => toPageWithProperties(r)), [result.rows])
  return { pages, isLoading: isLoading || hasMore, isDegraded, error }
}

export function useRelatedPages({
  definitions,
  pages,
  pageTypeSlugById,
}: {
  definitions: readonly { id: string; type: string; config?: unknown }[] | undefined
  pages: readonly { properties: Record<string, unknown> }[]
  pageTypeSlugById: ReadonlyMap<string, string>
}): readonly PageWithProperties[] {
  const specs = useMemo<readonly RelationSpec[]>(() => {
    if (!definitions) return []
    const out: RelationSpec[] = []
    for (const d of definitions) {
      if (d.type !== "relation" && d.type !== "multi-relation") continue
      const targetPageTypeSlug = targetSlugOf(d.config, pageTypeSlugById)
      if (targetPageTypeSlug === undefined) continue
      out.push({ propertyId: d.id, targetPageTypeSlug })
    }
    return out
  }, [definitions, pageTypeSlugById])

  const groups = useMemo(
    () => collectRelatedIds(pages, specs, RELATED_IDS_PER_PROPERTY_CAP),
    [pages, specs]
  )
  const groupsKey = useMemo(() => JSON.stringify(groups), [groups])
  const targetSlugs = useMemo(() => groups.map((one) => one.pageTypeSlug), [groups])
  useAcquireSlugs(targetSlugs)
  const { snapshot } = usePipelineLive(
    (collection) => createRelatedPipeline(collection, groups),
    groupsKey,
    groups.length > 0
  )
  return useMemo(
    () => (snapshot ?? []).map((row) => toPageWithProperties(flattenRow(row))),
    [snapshot]
  )
}

export interface ViewsFound {
  views: readonly PageWithProperties[]
  isLoading: boolean
}

function viewsWhere(asked: string | undefined, key: string, gatheredBy: string): PageWhere {
  if (asked == null || asked === "") return [{ key: "id", eq: NEVER_MATCH_VALUE }]
  return [{ key, eq: namedAs(gatheredBy, asked, null) }]
}

function useViewsWhere(where: PageWhere, asked: string | undefined): ViewsFound {
  const options = useMemo<UsePagesSupabaseOptions>(
    () => ({
      pageTypeSlug: VIEW,
      where,
      order: [{ by: "viewPlace", dir: "asc" }],
    }),
    [where]
  )
  const result = usePages(options)
  const views = useMemo(
    () => (asked != null ? result.rows.map((r) => toPageWithProperties(r)) : []),
    [result.rows, asked]
  )
  return { views, isLoading: asked != null && result.isLoading }
}

export function useViewsForNavItem({
  navItemSlug,
}: {
  navItemSlug?: string | undefined
}): ViewsFound {
  const where = useMemo(() => viewsWhere(navItemSlug, NAV, NAV), [navItemSlug])
  return useViewsWhere(where, navItemSlug)
}

export function useViewsForPageType({
  pageTypeSlug,
}: {
  pageTypeSlug?: string | undefined
}): ViewsFound {
  const where = useMemo(() => viewsWhere(pageTypeSlug, PAGE_TYPE_KEY, PAGE_TYPE), [pageTypeSlug])
  return useViewsWhere(where, pageTypeSlug)
}
