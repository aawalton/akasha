import type { RelationProperty } from "akasha/pages/relation-properties/relation-property.page-type.types.ts"

export const personAuthorityPerson = {
  id: "01a05427-ec7c-77a5-bd18-456d3b67066d",
  pageTypeSlug: "relation-property",
  type: "relation-property",
  slug: "person-authority-person",
  propertySlug: "person",
  definition: "the person who holds the authority",
  targetPageType: "page-type/person",
  types: "ts",
} as const satisfies RelationProperty
