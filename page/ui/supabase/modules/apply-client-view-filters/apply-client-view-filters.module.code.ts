"use client"

import type {
  PageTypePropertiesMap,
  PropertyDefinition,
} from "akasha/page/core/modules/page-data/page-data.module.code.ts"
import type { Page } from "akasha/page/core/modules/page-types/page-types.module.code.ts"
import type { ViewFilter } from "akasha/page/core/schema/modules/view-data/view-data.module.code.ts"
import { applyView } from "akasha/page/core/view/modules/apply-view/apply-view.module.code.ts"

export function applyClientViewFilters(
  rows: readonly Page[],
  filters: readonly ViewFilter[] | undefined,
  properties: readonly PropertyDefinition[] | undefined,
  propertiesByPageType: PageTypePropertiesMap | undefined
): readonly Page[] {
  if (filters == null || filters.length === 0) return rows
  if (properties == null || properties.length === 0) return rows
  return applyView(rows, properties, { filters }, propertiesByPageType)
}

export function adjustTotalForClientFilters(
  serverTotal: number | null,
  residentCount: number,
  filteredCount: number
): number | null {
  if (serverTotal == null) return null
  const dropped = residentCount - filteredCount
  return Math.max(0, serverTotal - dropped)
}
