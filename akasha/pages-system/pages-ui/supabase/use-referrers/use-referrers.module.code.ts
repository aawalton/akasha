"use client"

import { getPages } from "@akasha/pages-access/get"
import type { PageWhere } from "@akasha/pages-core/page-types"
import type { PageTypePropertiesMap } from "@akasha/pages-core/property-types/rollup"
import {
  type PageWithProperties,
  toPageWithProperties,
} from "@akasha/pages-ui/supabase/page-with-properties"
import { isRecord } from "@akasha/utils-narrow/is-record"
import { useEffect, useMemo, useRef, useState } from "react"

export interface Referrer {
  page: PageWithProperties
  sourcePageTypeSlug: string
  viaPropertyId: string
  viaPropertyTitle: string
}

export interface InboundSpec {
  sourcePageTypeSlug: string
  propertyId: string
  propertyTitle: string
  kind: "relation" | "multi-relation"
}

const MAX_REFERRERS = 100

function readTargetPageTypeId(config: unknown): string | undefined {
  if (!isRecord(config)) return undefined
  const target = config.targetPageTypeId
  return typeof target === "string" ? target : undefined
}

export function computeInboundSpecs({
  pageTypeId,
  pageTypePropertiesMap,
  pageTypeSlugById,
}: {
  pageTypeId: string | undefined
  pageTypePropertiesMap: PageTypePropertiesMap
  pageTypeSlugById: ReadonlyMap<string, string>
}): readonly InboundSpec[] {
  if (pageTypeId == null) return []
  const out: InboundSpec[] = []
  for (const [sourcePageTypeId, defs] of pageTypePropertiesMap) {
    const sourcePageTypeSlug = pageTypeSlugById.get(sourcePageTypeId)
    if (sourcePageTypeSlug == null) continue
    for (const d of defs) {
      if (d.type !== "relation" && d.type !== "multi-relation") continue
      if (readTargetPageTypeId(d.config) !== pageTypeId) continue
      out.push({
        sourcePageTypeSlug,
        propertyId: d.id,
        propertyTitle: d.title,
        kind: d.type,
      })
    }
  }
  return out
}

export function referrerWhere(spec: InboundSpec, pageId: string): PageWhere {
  return spec.kind === "multi-relation"
    ? [{ key: spec.propertyId, includes: pageId }]
    : [{ key: spec.propertyId, eq: pageId }]
}

export function useReferrers({
  pageId,
  pageTypeId,
  pageTypePropertiesMap,
  pageTypeSlugById,
}: {
  pageId: string | undefined
  pageTypeId: string | undefined
  pageTypePropertiesMap: PageTypePropertiesMap
  pageTypeSlugById: ReadonlyMap<string, string>
}): readonly Referrer[] {
  const specs = useMemo<readonly InboundSpec[]>(
    () => computeInboundSpecs({ pageTypeId, pageTypePropertiesMap, pageTypeSlugById }),
    [pageTypeId, pageTypePropertiesMap, pageTypeSlugById]
  )

  const [rows, setRows] = useState<readonly Referrer[]>([])
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
            where: referrerWhere(spec, pageId),
            limit: MAX_REFERRERS,
          })
          return { spec, res }
        })
      )
      if (reqId !== reqRef.current) return
      const collected: Referrer[] = []
      const seen = new Set<string>()
      for (const { spec, res } of results) {
        for (const row of res.rows) {
          const page = toPageWithProperties(row)
          if (seen.has(page._id)) continue
          seen.add(page._id)
          collected.push({
            page,
            sourcePageTypeSlug: spec.sourcePageTypeSlug,
            viaPropertyId: spec.propertyId,
            viaPropertyTitle: spec.propertyTitle,
          })
          if (collected.length >= MAX_REFERRERS) break
        }
        if (collected.length >= MAX_REFERRERS) break
      }
      setRows(collected)
    })()
  }, [pageId, specs])

  return rows
}
