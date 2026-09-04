import type { PropertyDefinition } from "@akasha/pages-core/types"
import type { PageWithProperties } from "@akasha/pages-ui/supabase/page-with-properties"
import type { PageRow } from "@akasha/pages-ui-components/view-engine/view-row"
import { buildPageHref } from "@akasha/pages-url/page-href"
import { buildPageListingHref } from "@akasha/pages-url/page-listing-href"
import { type PageTypeSlug, toPageTypeSlug } from "@akasha/pages-url/page-type-slug"

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
  pluralSlugById: ReadonlyMap<string, string>
} {
  const slugById = new Map<string, PageTypeSlug>()
  const pluralSlugById = new Map<string, string>()
  for (const pt of pageTypes) {
    const slug = pt.properties?.slug
    const plural = pt.properties?.pluralSlug
    const hasSlug = typeof slug === "string" && slug.length > 0
    if (hasSlug) slugById.set(pt._id, toPageTypeSlug(slug))
    if (typeof plural === "string" && plural.length > 0) pluralSlugById.set(pt._id, plural)
    else if (hasSlug) pluralSlugById.set(pt._id, slug)
  }
  return { slugById, pluralSlugById }
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
  pluralSlugById: ReadonlyMap<string, string>
}): string {
  if (!args.target) return args.fallbackHref
  const pluralSlug = args.pluralSlugById.get(args.target.targetPageTypeId)
  if (pluralSlug == null || pluralSlug.length === 0) return args.fallbackHref
  return buildPageListingHref({
    pluralSlug,
    query: `${args.target.backRelationPropertyId}=${args.rowId}`,
  })
}
