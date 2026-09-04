import type { Slug } from "@akasha/pages-system/page/slug"
import type { RelationProperty } from "@akasha/pages-system/relation-property"

export type PersonSlug = Slug

export const personAuthorityPersonSlug = {
  id: "01a05427-ec7c-77a5-bd18-456d3b67066d",
  pageTypeSlug: "relation-property",
  slug: "person-authority-person-slug",
  propertySlug: "person-slug",
  definition: "the person who holds the authority",
  targetPageTypeSlug: "page-type/person",
} as const satisfies RelationProperty
