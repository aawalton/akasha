import type { Slug } from "@akasha/pages-system/page/slug"
import type { RelationProperty } from "@akasha/pages-system/relation-property"

export type DomainColorSlug = Slug

export const domainColorSlug = {
  id: "01a06935-8f85-7864-89e7-74371a2c2c37",
  pageTypeSlug: "relation-property",
  slug: "domain-color-slug",
  propertySlug: "color-slug",
  definition: "the color a domain is drawn in",
  targetPageTypeSlug: "page-type/color",
} as const satisfies RelationProperty
