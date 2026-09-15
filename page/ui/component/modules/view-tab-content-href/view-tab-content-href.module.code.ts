import type { PropertyDefinition } from "akasha/page/core/modules/page-data/page-data.module.code.ts"
import type { PageRow } from "akasha/page/ui/component/view-engine/modules/view-row/view-row.module.code.ts"
import type { PageWithProperties } from "akasha/page/ui/supabase/modules/page-with-properties/page-with-properties.module.code.ts"
import { buildPageHref } from "akasha/page/url/modules/page-href/page-href.module.code.ts"
import { buildPageListingHref } from "akasha/page/url/modules/page-listing-href/page-listing-href.module.code.ts"
import {
  type PageTypeSlug,
  toPageTypeSlug,
} from "akasha/page/url/modules/page-type-slug/page-type-slug.module.code.ts"

export function readRelationConfig(
  config: PropertyDefinition["config"]
): { targetPageTypeId: string; backRelationPropertyId: string } | undefined {
  if (!config || typeof config !== "object" || Array.isArray(config)) return undefined
  const targetPageTypeId = config.targetPageTypeId
  const backRelationPropertyId = config.backRelationPropertyId
  if (typeof targetPageTypeId !== "string" || targetPageTypeId.length === 0) return undefined
  if (typeof backRelationPropertyId !== "string" || backRelationPropertyId.length === 0)
    return undefined
  return { targetPageTypeId, backRelationPropertyId }
}

export function buildPageTypeSlugMaps(pageTypes: readonly PageWithProperties[]): {
  slugById: ReadonlyMap<string, PageTypeSlug>
} {
  const slugById = new Map<string, PageTypeSlug>()
  for (const pt of pageTypes) {
    const slug = pt.properties?.slug
    if (typeof slug === "string" && slug.length > 0) slugById.set(pt._id, toPageTypeSlug(slug))
  }
  return { slugById }
}

export function resolveRowPageTypeSlug(
  rowPageTypeSlug: PageTypeSlug | undefined,
  pageId: string,
  pages: readonly PageWithProperties[],
  slugById: ReadonlyMap<string, PageTypeSlug>
): PageTypeSlug | undefined {
  if (rowPageTypeSlug != null) return rowPageTypeSlug
  const match = pages.find((p) => p._id === pageId)
  const pageTypeId =
    typeof match?.properties?.pageTypeId === "string" ? match.properties.pageTypeId : undefined
  return pageTypeId != null ? slugById.get(pageTypeId) : undefined
}

export function buildRowHref(rowPageTypeSlug: PageTypeSlug | undefined, row: PageRow): string {
  if (rowPageTypeSlug == null) return ""
  const slug = typeof row.slug === "string" ? row.slug : null
  const titleSource = typeof row.title === "string" ? row.title : null
  return buildPageHref({
    pageTypeSlug: rowPageTypeSlug,
    slug,
    fallbackSlugSource: titleSource,
    id: row._id,
  })
}

export function buildRelationBackLinkHref(args: {
  target: { targetPageTypeId: string; backRelationPropertyId: string } | undefined
  rowId: string
  fallbackHref: string
  slugById: ReadonlyMap<string, PageTypeSlug> | undefined
}): string {
  if (!args.target) return args.fallbackHref
  const slug = args.slugById?.get(args.target.targetPageTypeId)
  if (slug == null || slug.length === 0) return args.fallbackHref
  return buildPageListingHref({
    slug,
    query: `${args.target.backRelationPropertyId}=${args.rowId}`,
  })
}
