import type { Slug } from "../../../pages-system/page/properties/slug.text-property.ts"
import type { RelationProperty } from "../../../pages-system/relation-property/relation-property.page-type.ts"

export type PersonSlug = Slug

export const personAuthorityPersonSlug = {
  id: "01a05427-ec7c-77a5-bd18-456d3b67066d",
  pageTypeSlug: "relation-property",
  slug: "person-authority-person-slug",
  propertySlug: "person-slug",
  definition: "the person who holds the authority",
  targetPageTypeSlug: "page-type/person",
} as const satisfies RelationProperty
