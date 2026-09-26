import type { RelationProperty } from "akasha/page/relation-property/relation-property.page-type.types.ts"

export const characterPlace = {
  id: "01a0d43f-8e7c-7f57-8ab2-ee210ac0f257",
  type: "page-type/relation-property",
  slug: "character-place",
  propertySlug: "place",
  definition: "the place a character is in",
  targetPageType: "page-type/place",
  types: "ts",
} as const satisfies RelationProperty
