"use client"

import { computeFillAggregatesForPage } from "@shared/pages-core/property-types/aggregate"
import { type PageTypePropertiesMap } from "@shared/pages-core/property-types/rollup"
import { type PropertyDefinition } from "@shared/pages-core/types"
import { useMemo } from "react"
import { toAggregateInputs, toPageDataJSON } from "../components/page-data-json"

interface PageLike {
  readonly _id: string
  readonly properties: Record<string, unknown>
}

export interface UseViewRowAggregatesArgs {
  readonly pages: readonly PageLike[]
  readonly definitions: readonly PropertyDefinition[]
  readonly relatedPages: readonly PageLike[]
  readonly propertiesByPageType: PageTypePropertiesMap
}

export function useViewRowAggregates({
  pages,
  definitions,
  relatedPages,
  propertiesByPageType,
}: UseViewRowAggregatesArgs): ReadonlyMap<string, Record<string, number | null>> {
  const aggregateInputs = useMemo(() => toAggregateInputs(relatedPages), [relatedPages])

  return useMemo(() => {
    const byRow = new Map<string, Record<string, number | null>>()
    if (!definitions.some((d) => d.type === "aggregate")) return byRow
    for (const page of pages) {
      const fill = computeFillAggregatesForPage(
        toPageDataJSON(page.properties),
        definitions,
        aggregateInputs,
        propertiesByPageType
      )
      if (Object.keys(fill).length > 0) byRow.set(page._id, fill)
    }
    return byRow
  }, [pages, definitions, aggregateInputs, propertiesByPageType])
}
