import type { PropertyDefinition } from "akasha/pages/core/page-data/page-data.module.code.ts"
import type { ViewDataJSON } from "akasha/pages/core/schema/view-data/view-data.module.code.ts"
import type { PageTypeSlug } from "akasha/pages/url/page-type-slug/page-type-slug.module.code.ts"

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
