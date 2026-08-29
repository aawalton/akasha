import type { Slug } from "../../../pages-system/page/properties/slug.text-property.ts"
import type { RelationProperty } from "../../../pages-system/page-property/relation-property.page-type.ts"

export type DomainSlug = Slug

export const domainSlug = {
  id: "01a04a08-fcf3-7003-9b33-ccbd3edd35cb",
  pageTypeSlug: "relation-property",
  slug: "domain-slug",
  definition: "a slug naming a domain",
  targetPageTypeSlug: "page-type/domain",
} as const satisfies RelationProperty
