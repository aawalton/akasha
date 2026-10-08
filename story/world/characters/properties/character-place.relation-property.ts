import type { RelationProperty } from "akasha/page/relation-property/relation-property.page-type.types.ts"

export const characterPlace = {
  id: "01a0d43f-8e7c-7f57-8ab2-ee210ac0f257",
  type: "page-type/relation-property",
  slug: "character-place",
  propertySlug: "place",
  definition: "the place a character is in",
  targetPageType: "page-type/place",
  types: "ts",
  createdAt: "2026-09-24T16:28:50.172Z",
  updatedAt: "2026-09-26T17:44:02.000Z",
} as const satisfies RelationProperty
