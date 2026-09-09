import type { Slug } from "@akasha/pages/page/slug"
import type { RelationProperty } from "@akasha/pages/relation-property"

export type PersonSlug = Slug

export const personAccessPerson = {
  id: "01a05427-ec7b-7f27-8ea5-197566d62862",
  pageTypeSlug: "relation-property",
  slug: "person-access-person",
  propertySlug: "person",
  definition: "the person who holds the access",
  targetPageType: "page-type/person",
} as const satisfies RelationProperty
