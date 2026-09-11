import type { RelationProperty } from "akasha/pages/relation-properties/relation-property.page-type.types.ts"

export const personAccessPerson = {
  id: "01a05427-ec7b-7f27-8ea5-197566d62862",
  pageTypeSlug: "relation-property",
  type: "relation-property",
  slug: "person-access-person",
  propertySlug: "person",
  definition: "the person who holds the access",
  targetPageType: "page-type/person",
  types: "ts",
} as const satisfies RelationProperty
