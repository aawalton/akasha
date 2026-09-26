import type { RelationProperty } from "akasha/page/relation-property/relation-property.page-type.types.ts"

export const haremHotelSkillCharacter = {
  id: "01a0de53-340a-7c56-8fa3-47cb544df23a",
  type: "page-type/relation-property",
  slug: "harem-hotel-skill-character",
  propertySlug: "character",
  definition: "the character holding a skill in the Harem Hotel",
  targetPageType: "page-type/character",
  types: "ts",
} as const satisfies RelationProperty
