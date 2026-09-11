import type { RelationProperty } from "akasha/pages/relation-properties/relation-property.page-type.types.ts"

export const personAuthorityKind = {
  id: "01a0542e-017d-709a-bab6-fa1c73782240",
  type: "relation-property",
  slug: "person-authority-kind",
  propertySlug: "authority-kind",
  definition: "which sort of act the authority permits",
  targetPageType: "page-type/authority-kind",
  types: "ts",
} as const satisfies RelationProperty
