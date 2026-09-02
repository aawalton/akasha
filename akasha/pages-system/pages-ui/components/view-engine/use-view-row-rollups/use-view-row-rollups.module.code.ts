"use client"

import {
  computeFillRollupsForPage,
  type PageTypePropertiesMap,
} from "@akasha/pages-core/property-types/rollup"
import type { PropertyValue } from "@akasha/pages-core/property-types/types"
import type { PropertyDefinition } from "@akasha/pages-core/types"
import { toAggregateInputs, toPageDataJSON } from "@akasha/pages-ui-components/page-data-json"
import { useMemo } from "react"

interface PageLike {
  readonly _id: string
  readonly properties: Record<string, unknown>
}

export interface UseViewRowRollupsArgs {
  readonly pages: readonly PageLike[]
  readonly definitions: readonly PropertyDefinition[]
  readonly relatedPages: readonly PageLike[]
  readonly propertiesByPageType: PageTypePropertiesMap
}

export function useViewRowRollups({
  pages,
  definitions,
  relatedPages,
  propertiesByPageType,
}: UseViewRowRollupsArgs): ReadonlyMap<string, Record<string, PropertyValue>> {
  const rollupInputs = useMemo(() => toAggregateInputs(relatedPages), [relatedPages])

  return useMemo(() => {
    const byRow = new Map<string, Record<string, PropertyValue>>()
    if (!definitions.some((d) => d.type === "rollup")) return byRow
    for (const page of pages) {
      const fill = computeFillRollupsForPage(
        toPageDataJSON(page.properties),
        definitions,
        rollupInputs,
        propertiesByPageType
      )
      if (Object.keys(fill).length > 0) byRow.set(page._id, fill)
    }
    return byRow
  }, [pages, definitions, rollupInputs, propertiesByPageType])
}
