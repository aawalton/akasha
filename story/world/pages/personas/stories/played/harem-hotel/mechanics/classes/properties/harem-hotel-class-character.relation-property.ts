import type { RelationProperty } from "akasha/page/relation-property/relation-property.page-type.types.ts"

export const haremHotelClassCharacter = {
  id: "01a0de51-b973-7659-84a8-11fc6f621041",
  type: "page-type/relation-property",
  slug: "harem-hotel-class-character",
  propertySlug: "character",
  definition: "the character holding a class in the Harem Hotel",
  targetPageType: "page-type/character",
  types: "ts",
} as const satisfies RelationProperty
