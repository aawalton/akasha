import type { ViewDataJSON } from "@shared/pages-core/schema/view-data"
import type { PropertyDefinition } from "@shared/pages-core/types"
import type { PageTypeSlug } from "@shared/pages-url"

export interface FlatQueryArgs {
  pageTypeId: string
  pageTypeSlug: PageTypeSlug
  viewConfig: ViewDataJSON
  properties: readonly PropertyDefinition[]
  viewId: string
  viewUpdatedAt: string
}

export function buildFlatQueryArgs(params: {
  groupByPropertyId: string | undefined
  spanDescendants: boolean
  targetPageTypeId: string
  pageTypeSlug: PageTypeSlug
  effectiveConfig: ViewDataJSON
  properties: readonly PropertyDefinition[]
}): FlatQueryArgs | undefined {
  if (
    params.groupByPropertyId != null ||
    params.spanDescendants ||
    params.targetPageTypeId.length === 0
  ) {
    return undefined
  }
  const synthKey = `synthetic-relation:${params.targetPageTypeId}:${JSON.stringify(
    params.effectiveConfig.filters ?? null
  )}:${JSON.stringify(params.effectiveConfig.sorts ?? null)}`
  return {
    pageTypeId: params.targetPageTypeId,
    pageTypeSlug: params.pageTypeSlug,
    viewConfig: params.effectiveConfig,
    properties: params.properties,
    viewId: synthKey,
    viewUpdatedAt: synthKey,
  }
}
