import type { Slug } from "@akasha/pages/page/slug"
import type { RelationProperty } from "akasha/pages/relation-properties/relation-property.page-type.types.ts"

export type PageDomain = Slug

export const pageDomain = {
  id: "01a04a08-fcf3-7003-9b33-ccbd3edd35cb",
  pageTypeSlug: "relation-property",
  type: "relation-property",
  slug: "page-domain",
  propertySlug: "domain",
  definition: "a slug naming a domain",
  targetPageType: "page-type/domain",
} as const satisfies RelationProperty
