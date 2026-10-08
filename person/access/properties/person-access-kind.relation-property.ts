import type { RelationProperty } from "akasha/page/relation-property/relation-property.page-type.types.ts"

export const personAccessKind = {
  id: "01a0542e-017c-7d0a-bbee-cf9bbe611884",
  type: "page-type/relation-property",
  slug: "person-access-kind",
  propertySlug: "access-kind",
  definition: "which sort of thing the access reaches",
  targetPageType: "page-type/access-kind",
  types: "ts",
  createdAt: "2026-08-30T19:38:16.316Z",
  updatedAt: "2026-09-15T16:30:55.000Z",
} as const satisfies RelationProperty
