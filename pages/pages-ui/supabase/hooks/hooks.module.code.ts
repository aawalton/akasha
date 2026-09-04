"use client"

import { flattenRow } from "@akasha/pages-access/routing-core"
import { NEVER_MATCH_VALUE } from "@akasha/pages-access/sentinels"
import type { PageCondition, PageWhere } from "@akasha/pages-core/page-types"
import { useAcquireSlug, usePipelineLive } from "@akasha/pages-ui/cache/tanstack-live"
import {
  collectRelatedIds,
  RELATED_IDS_PER_PROPERTY_CAP,
  type RelationSpec,
} from "@akasha/pages-ui/supabase/collect-related-ids"
import {
  type PageWithProperties,
  toPageWithProperties,
} from "@akasha/pages-ui/supabase/page-with-properties"
import { getRelatedPagesByIdCoalesced } from "@akasha/pages-ui/supabase/related-pages-coalesce"
import { type UsePagesSupabaseOptions, usePagesSupabase } from "@akasha/pages-ui/supabase/use-pages"
import {
  createIdSuffixPipeline,
  type IdSuffixResult,
} from "@akasha/pages-ui-store/query/id-suffix-pipeline"
import type { PageTypeSlug } from "@akasha/pages-url/page-type-slug"
import { isRecord } from "@akasha/utils-narrow/is-record"
import { useEffect, useMemo, useRef, useState } from "react"

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
  const result = usePagesSupabase({ pageTypeSlug })
  const { error, hasMore, isDegraded, isLoading, loadMore } = result
  useEffect(() => {
    if (hasMore && !isLoading) loadMore()
  }, [hasMore, isLoading, loadMore])
  const pages = useMemo(() => result.rows.map((r) => toPageWithProperties(r)), [result.rows])
  return { pages, isLoading: isLoading || hasMore, isDegraded, error }
}

function readTargetPageTypeId(config: unknown): string | undefined {
  if (!isRecord(config)) return undefined
  const target = config.targetPageTypeId
  return typeof target === "string" ? target : undefined
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
      const targetPageTypeId = readTargetPageTypeId(d.config)
      if (targetPageTypeId === undefined) continue
      const targetPageTypeSlug = pageTypeSlugById.get(targetPageTypeId)
      if (targetPageTypeSlug === undefined) continue
      out.push({ propertyId: d.id, targetPageTypeSlug })
    }
    return out
  }, [definitions, pageTypeSlugById])

  const groups = useMemo(
    () => collectRelatedIds(pages, specs, RELATED_IDS_PER_PROPERTY_CAP),
    [pages, specs]
  )

  const groupsKey = useMemo(
    () => groups.map((g) => `${g.pageTypeSlug}:${g.ids.join(",")}`).join("|"),
    [groups]
  )

  const [rows, setRows] = useState<readonly PageWithProperties[]>([])
  const reqRef = useRef(0)
  useEffect(() => {
    const reqId = ++reqRef.current
    if (groups.length === 0) {
      setRows([])
      return
    }
    void (async () => {
      const result = await getRelatedPagesByIdCoalesced(groups)
      if (reqId !== reqRef.current) return
      setRows(result.map((row) => toPageWithProperties(row)))
    })()
  }, [groupsKey])

  return rows
}

export function useViewsForNavItem({
  navItemId,
  navItemSlug,
}: {
  navItemId: string | undefined
  navItemSlug?: string | undefined
}): {
  views: readonly PageWithProperties[]
  isLoading: boolean
} {
  const asked = navItemSlug ?? navItemId
  const where = useMemo<PageWhere>(() => {
    const reaches: PageCondition[] = []
    if (navItemSlug != null && navItemSlug !== "") reaches.push({ key: "nav", eq: navItemSlug })
    if (navItemId != null && navItemId !== "") reaches.push({ key: "owner", eq: navItemId })
    if (reaches.length === 0) return [{ key: "id", eq: NEVER_MATCH_VALUE }]
    return reaches.length === 1 ? reaches : [{ or: reaches }]
  }, [navItemId, navItemSlug])
  const options = useMemo<UsePagesSupabaseOptions>(
    () => ({
      pageTypeSlug: "view",
      where,
      order: [
        { by: "sortOrder", dir: "asc" },
        { by: "sort_order", dir: "asc" },
      ],
    }),
    [where]
  )
  const result = usePagesSupabase(options)
  const views = useMemo(
    () => (asked != null ? result.rows.map((r) => toPageWithProperties(r)) : []),
    [result.rows, asked]
  )
  return { views, isLoading: asked != null && result.isLoading }
}
