import type { RelationProperty } from "akasha/page/relation-property/relation-property.page-type.types.ts"

export const personAuthorityPerson = {
  id: "01a05427-ec7c-77a5-bd18-456d3b67066d",
  type: "page-type/relation-property",
  slug: "person-authority-person",
  propertySlug: "person",
  definition: "the person who holds the authority",
  targetPageType: "page-type/person",
  types: "ts",
  createdAt: "2026-08-30T19:31:37.724Z",
  updatedAt: "2026-09-15T16:30:55.000Z",
} as const satisfies RelationProperty
