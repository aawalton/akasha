import type { Slug } from "@akasha/pages/page/slug"
import type { RelationProperty } from "@akasha/pages/relation-property"

export type PersonSlug = Slug

export const personAuthorityPerson = {
  id: "01a05427-ec7c-77a5-bd18-456d3b67066d",
  pageTypeSlug: "relation-property",
  slug: "person-authority-person",
  propertySlug: "person",
  definition: "the person who holds the authority",
  targetPageType: "page-type/person",
} as const satisfies RelationProperty
