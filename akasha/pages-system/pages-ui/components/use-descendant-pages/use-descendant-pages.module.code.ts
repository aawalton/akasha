"use client"

import { getPages } from "@akasha/pages-access/get"
import {
  extractRelationContainment,
  getPagesByRelation,
} from "@akasha/pages-access/get-by-relation"
import { collectPages } from "@akasha/pages-access/iterate"
import type { PageOrder, PageSelect } from "@akasha/pages-access/types"
import type { Page, PageWhere } from "@akasha/pages-core/page-types"
import {
  type ListingConfig,
  listingIncludesDescendants,
} from "@akasha/pages-core/schema/listing-config"
import { resolveDescendantPageTypeIds } from "@akasha/pages-core/schema/page-type-inheritance"
import type { ViewSort } from "@akasha/pages-core/schema/view-data"
import {
  type PageWithProperties,
  toPageWithProperties,
} from "@akasha/pages-ui/supabase/page-with-properties"
import { type PageTypeSlug, toPageTypeSlug } from "@akasha/pages-url/page-type-slug"
import { useEffect, useMemo, useRef, useState } from "react"

interface DescendantPagesResult {
  rows: readonly Page[]
  isLoading: boolean
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
  slugs: readonly PageTypeSlug[],
  options: UseDescendantPagesOptions = {}
): DescendantPagesResult {
  const [rows, setRows] = useState<readonly Page[]>([])
  const [isLoading, setIsLoading] = useState(true)

  const enabled = options.enabled !== false

  const optionsRef = useRef(options)
  optionsRef.current = options

  const slugsKey = useMemo(() => slugs.join(","), [slugs])
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
    if (!enabled || slugsKey.length === 0) {
      setRows([])
      setIsLoading(false)
      return
    }
    let cancelled = false
    setIsLoading(true)
    const slugList = slugsKey.split(",").map((s) => toPageTypeSlug(s))
    const { select, order, limit, where } = optionsRef.current
    const hasWhere = where != null && where.length > 0
    const relation = hasWhere ? extractRelationContainment(where) : null
    const load: Promise<readonly Page[]> = relation
      ? getPagesByRelation({
          relationKey: relation.relationKey,
          relationValue: relation.relationValue,
          pageTypeSlugs: slugList,
          select,
        })
      : hasWhere
        ? Promise.all(
            slugList.map((slug) =>
              collectPages({
                pageTypeSlug: slug,
                select,
                order,
                where,
                pageSize: 1000,
                max: SCOPED_MAX_ROWS,
              })
            )
          ).then((results) => results.flat())
        : Promise.all(
            slugList.map((slug) =>
              getPages({ pageTypeSlug: slug, select, order, limit: limit ?? 1000 }).then(
                (r) => r.rows
              )
            )
          ).then((results) => results.flat())
    load
      .then((merged) => {
        if (cancelled) return
        setRows(merged)
        setIsLoading(false)
      })
      .catch(() => {
        if (cancelled) return
        setRows([])
        setIsLoading(false)
      })
    return () => {
      cancelled = true
    }
  }, [enabled, slugsKey, selectKey, orderKey, whereKey])

  return { rows, isLoading }
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

export interface DescendantListingResult {
  spanDescendants: boolean
  pages: readonly PageWithProperties[]
  isLoading: boolean
}

export function useDescendantListing(args: {
  pageTypes: readonly PageWithProperties[]
  targetPageTypeId: string
  listingConfig: ListingConfig | undefined
  sorts: readonly ViewSort[] | undefined
  where: PageWhere | undefined
}): DescendantListingResult {
  const { pageTypes, targetPageTypeId, listingConfig, sorts, where } = args

  const descendantSlugs = useMemo<readonly PageTypeSlug[]>(() => {
    if (listingConfig == null) return []
    if (!listingIncludesDescendants(listingConfig)) return []
    if (targetPageTypeId.length === 0) return []
    const ids = resolveDescendantPageTypeIds(pageTypes, targetPageTypeId)
    if (ids.size <= 1) return []
    const slugs: PageTypeSlug[] = []
    for (const pt of pageTypes) {
      if (!ids.has(pt._id)) continue
      const slug = pt.properties?.slug
      if (typeof slug === "string" && slug.length > 0) slugs.push(toPageTypeSlug(slug))
    }
    return slugs
  }, [pageTypes, targetPageTypeId, listingConfig])

  const spanDescendants = descendantSlugs.length > 1

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

  const { rows, isLoading } = useDescendantPages(descendantSlugs, {
    order,
    where,
    enabled: spanDescendants,
  })

  const pages = useMemo<readonly PageWithProperties[]>(() => {
    if (!spanDescendants) return []
    return sortMergedPages(rows.map(toPageWithProperties), sorts)
  }, [spanDescendants, rows, sorts])

  return { spanDescendants, pages, isLoading: spanDescendants ? isLoading : false }
}
