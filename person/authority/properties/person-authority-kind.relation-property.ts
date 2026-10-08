import type { RelationProperty } from "akasha/page/relation-property/relation-property.page-type.types.ts"

export const personAuthorityKind = {
  id: "01a0542e-017d-709a-bab6-fa1c73782240",
  type: "page-type/relation-property",
  slug: "person-authority-kind",
  propertySlug: "authority-kind",
  definition: "which sort of act the authority permits",
  targetPageType: "page-type/authority-kind",
  types: "ts",
  createdAt: "2026-08-30T19:38:16.317Z",
  updatedAt: "2026-09-15T16:30:55.000Z",
} as const satisfies RelationProperty
