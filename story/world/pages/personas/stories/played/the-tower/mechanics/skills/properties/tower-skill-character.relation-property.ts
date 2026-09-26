import type { RelationProperty } from "akasha/page/relation-property/relation-property.page-type.types.ts"

export const towerSkillCharacter = {
  id: "01a0de38-6904-7c2d-8fa4-cddabf2b88c3",
  type: "page-type/relation-property",
  slug: "tower-skill-character",
  propertySlug: "character",
  definition: "the character holding a skill in the Tower",
  targetPageType: "page-type/character",
  types: "ts",
} as const satisfies RelationProperty
