"use client"

import { collectPages } from "akasha/page/access/modules/iterate/iterate.module.code.ts"
import type { PageOrder, PageSelect } from "akasha/page/access/modules/types/types.module.code.ts"
import type { Page, PageWhere } from "akasha/page/core/modules/page-types/page-types.module.code.ts"
import {
  type ListingConfig,
  listingIncludesDescendants,
} from "akasha/page/core/schema/modules/listing-config/listing-config.module.code.ts"
import { resolveDescendantPageTypeIds } from "akasha/page/core/schema/modules/page-type-inheritance/page-type-inheritance.module.code.ts"
import type { ViewSort } from "akasha/page/core/schema/modules/view-data/view-data.module.code.ts"
import {
  type PageWithProperties,
  toPageWithProperties,
} from "akasha/page/ui/supabase/modules/page-with-properties/page-with-properties.module.code.ts"
import {
  type PageTypeSlug,
  toPageTypeSlug,
} from "akasha/page/url/modules/page-type-slug/page-type-slug.module.code.ts"
import { useEffect, useMemo, useRef, useState } from "react"

interface DescendantPagesResult {
  rows: readonly Page[]
  isLoading: boolean
  unasked: string | null
}

const SCOPED_MAX_ROWS = 20000

interface UseDescendantPagesOptions {
  select?: PageSelect
  order?: PageOrder
  limit?: number
  where?: PageWhere
  enabled?: boolean
}

function useDescendantPages(
  slug: PageTypeSlug | null,
  options: UseDescendantPagesOptions = {}
): DescendantPagesResult {
  const [rows, setRows] = useState<readonly Page[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [unasked, setUnasked] = useState<string | null>(null)

  const enabled = options.enabled !== false

  const optionsRef = useRef(options)
  optionsRef.current = options

  const slugKey = slug ?? ""
  const selectKey = useMemo(
    () => (options.select ? options.select.join(",") : ""),
    [options.select]
  )
  const orderKey = useMemo(
    () => (options.order ? options.order.map((o) => `${o.by}:${o.dir}`).join("|") : ""),
    [options.order]
  )
  const whereKey = useMemo(
    () => (options.where ? JSON.stringify(options.where) : ""),
    [options.where]
  )

  useEffect(() => {
    if (!enabled || slugKey.length === 0) {
      setRows([])
      setIsLoading(false)
      setUnasked(null)
      return
    }
    const { select, order, limit, where } = optionsRef.current
    let cancelled = false
    setIsLoading(true)
    setUnasked(null)
    const load: Promise<readonly Page[]> = collectPages({
      pageTypeSlug: toPageTypeSlug(slugKey),
      select,
      order,
      where,
      pageSize: 1000,
      max: limit ?? SCOPED_MAX_ROWS,
    })
    load
      .then((found) => {
        if (cancelled) return
        setRows(found)
        setIsLoading(false)
      })
      .catch((thrown: unknown) => {
        if (cancelled) return
        setRows([])
        setUnasked(thrown instanceof Error ? thrown.message : String(thrown))
        setIsLoading(false)
      })
    return () => {
      cancelled = true
    }
  }, [enabled, slugKey, selectKey, orderKey, whereKey])

  return { rows, isLoading, unasked }
}

function compareValues(a: unknown, b: unknown): number {
  const aMissing = a == null || a === ""
  const bMissing = b == null || b === ""
  if (aMissing && bMissing) return 0
  if (aMissing) return 1
  if (bMissing) return -1
  if (typeof a === "number" && typeof b === "number") return a - b
  return String(a).localeCompare(String(b))
}

function sortMergedPages(
  pages: readonly PageWithProperties[],
  sorts: readonly ViewSort[] | undefined
): readonly PageWithProperties[] {
  if (sorts == null || sorts.length === 0) return pages
  const indexed = pages.map((page, index) => ({ page, index }))
  indexed.sort((a, b) => {
    for (const s of sorts) {
      const field = String(s.field ?? "")
      if (field === "") continue
      const cmp = compareValues(a.page.properties[field], b.page.properties[field])
      if (cmp !== 0) return s.direction === "desc" ? -cmp : cmp
    }
    return a.index - b.index
  })
  return indexed.map((x) => x.page)
}

interface DescendantListingResult {
  spanDescendants: boolean
  pages: readonly PageWithProperties[]
  isLoading: boolean
  unasked: string | null
}

export function useDescendantListing(args: {
  pageTypes: readonly PageWithProperties[]
  targetPageTypeId: string
  listingConfig: ListingConfig | undefined
  sorts: readonly ViewSort[] | undefined
  where: PageWhere | undefined
}): DescendantListingResult {
  const { pageTypes, targetPageTypeId, listingConfig, sorts, where } = args

  const spanningSlug = useMemo<PageTypeSlug | null>(() => {
    if (listingConfig == null) return null
    if (!listingIncludesDescendants(listingConfig)) return null
    if (targetPageTypeId.length === 0) return null
    const ids = resolveDescendantPageTypeIds(pageTypes, targetPageTypeId)
    if (ids.size <= 1) return null
    let named = 0
    let own: PageTypeSlug | null = null
    for (const pt of pageTypes) {
      if (!ids.has(pt._id)) continue
      const slug = pt.properties?.slug
      if (typeof slug !== "string" || slug.length === 0) continue
      named += 1
      if (pt._id === targetPageTypeId) own = toPageTypeSlug(slug)
    }
    return named > 1 ? own : null
  }, [pageTypes, targetPageTypeId, listingConfig])

  const spanDescendants = spanningSlug !== null

  const order = useMemo<PageOrder | undefined>(() => {
    if (sorts == null || sorts.length === 0) return undefined
    const out: { by: string; dir: "asc" | "desc" }[] = []
    for (const s of sorts) {
      const by = String(s.field ?? "")
      if (by === "") continue
      out.push({ by, dir: s.direction === "desc" ? "desc" : "asc" })
    }
    return out.length > 0 ? out : undefined
  }, [sorts])

  const { rows, isLoading, unasked } = useDescendantPages(spanningSlug, {
    order,
    where,
    enabled: spanDescendants,
  })

  const pages = useMemo<readonly PageWithProperties[]>(() => {
    if (!spanDescendants) return []
    return sortMergedPages(rows.map(toPageWithProperties), sorts)
  }, [spanDescendants, rows, sorts])

  return {
    spanDescendants,
    pages,
    isLoading: spanDescendants ? isLoading : false,
    unasked: spanDescendants ? unasked : null,
  }
}
