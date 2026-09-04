import type { Slug } from "@akasha/pages-system/page/slug"
import type { RelationProperty } from "@akasha/pages-system/relation-property"

export type DomainSlug = Slug

export const domainSlug = {
  id: "01a04a08-fcf3-7003-9b33-ccbd3edd35cb",
  pageTypeSlug: "relation-property",
  slug: "domain-slug",
  propertySlug: "domain-slug",
  definition: "a slug naming a domain",
  targetPageTypeSlug: "page-type/domain",
} as const satisfies RelationProperty
