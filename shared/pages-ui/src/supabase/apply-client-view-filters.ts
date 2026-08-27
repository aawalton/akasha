"use client"

import type { Page } from "@shared/pages-core/page-types"
import { type PageTypePropertiesMap } from "@shared/pages-core/property-types/rollup"
import { type ViewFilter } from "@shared/pages-core/schema/view-data"
import { type PropertyDefinition } from "@shared/pages-core/types"
import { applyView } from "@shared/pages-core/view/apply-view"

export function applyClientViewFilters(
  rows: readonly Page[],
  filters: readonly ViewFilter[] | undefined,
  properties: readonly PropertyDefinition[] | undefined,
  pageTypeId: string | undefined,
  propertiesByPageType: PageTypePropertiesMap | undefined
): readonly Page[] {
  if (filters == null || filters.length === 0) return rows
  if (properties == null || properties.length === 0) return rows
  return applyView(rows, properties, { filters }, pageTypeId, propertiesByPageType)
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
