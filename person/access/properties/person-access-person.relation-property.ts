import type { RelationProperty } from "akasha/page/relation-property/relation-property.page-type.types.ts"

export const personAccessPerson = {
  id: "01a05427-ec7b-7f27-8ea5-197566d62862",
  type: "page-type/relation-property",
  slug: "person-access-person",
  propertySlug: "person",
  definition: "the person who holds the access",
  targetPageType: "page-type/person",
  types: "ts",
  createdAt: "2026-08-30T19:31:37.723Z",
  updatedAt: "2026-09-15T16:30:55.000Z",
} as const satisfies RelationProperty
