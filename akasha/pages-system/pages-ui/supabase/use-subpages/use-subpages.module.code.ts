"use client"

import { getPages } from "@akasha/pages-access/get"
import type { PageWhere } from "@akasha/pages-core/page-types"
import type { PageTypePropertiesMap } from "@akasha/pages-core/property-types/rollup"
import {
  type PageWithProperties,
  toPageWithProperties,
} from "@akasha/pages-ui/supabase/page-with-properties"
import { useEffect, useMemo, useRef, useState } from "react"

export interface Subpage {
  page: PageWithProperties
  sourcePageTypeSlug: string
}

export interface SubpageSpec {
  sourcePageTypeSlug: string
  propertyId: string
  kind: "relation" | "multi-relation"
}

const MAX_SUBPAGES = 100

export function computeSubpageSpecs({
  pageTypePropertiesMap,
  pageTypeSlugById,
}: {
  pageTypePropertiesMap: PageTypePropertiesMap
  pageTypeSlugById: ReadonlyMap<string, string>
}): readonly SubpageSpec[] {
  const out: SubpageSpec[] = []
  for (const [sourcePageTypeId, defs] of pageTypePropertiesMap) {
    const sourcePageTypeSlug = pageTypeSlugById.get(sourcePageTypeId)
    if (sourcePageTypeSlug == null) continue
    for (const d of defs) {
      if (d.id === "parentId" && d.type === "relation") {
        out.push({ sourcePageTypeSlug, propertyId: d.id, kind: "relation" })
      } else if (d.id === "parents" && d.type === "multi-relation") {
        out.push({ sourcePageTypeSlug, propertyId: d.id, kind: "multi-relation" })
      }
    }
  }
  return out
}

export function subpageWhere(spec: SubpageSpec, pageId: string): PageWhere {
  return spec.kind === "multi-relation"
    ? [{ key: spec.propertyId, includes: pageId }]
    : [{ key: spec.propertyId, eq: pageId }]
}

export function useSubpages({
  pageId,
  pageTypePropertiesMap,
  pageTypeSlugById,
}: {
  pageId: string | undefined
  pageTypePropertiesMap: PageTypePropertiesMap
  pageTypeSlugById: ReadonlyMap<string, string>
}): readonly Subpage[] {
  const specs = useMemo<readonly SubpageSpec[]>(
    () => computeSubpageSpecs({ pageTypePropertiesMap, pageTypeSlugById }),
    [pageTypePropertiesMap, pageTypeSlugById]
  )

  const [rows, setRows] = useState<readonly Subpage[]>([])
  const reqRef = useRef(0)
  useEffect(() => {
    const reqId = ++reqRef.current
    if (pageId == null || specs.length === 0) {
      setRows([])
      return
    }
    void (async () => {
      const results = await Promise.all(
        specs.map(async (spec) => {
          const res = await getPages({
            pageTypeSlug: spec.sourcePageTypeSlug,
            where: subpageWhere(spec, pageId),
            limit: MAX_SUBPAGES,
          })
          return { spec, res }
        })
      )
      if (reqId !== reqRef.current) return
      const collected: Subpage[] = []
      const seen = new Set<string>()
      for (const { spec, res } of results) {
        for (const row of res.rows) {
          const page = toPageWithProperties(row)
          if (seen.has(page._id)) continue
          seen.add(page._id)
          collected.push({ page, sourcePageTypeSlug: spec.sourcePageTypeSlug })
          if (collected.length >= MAX_SUBPAGES) break
        }
        if (collected.length >= MAX_SUBPAGES) break
      }
      setRows(collected)
    })()
  }, [pageId, specs])

  return rows
}
