import type { RelationProperty } from "akasha/page/relation-property/relation-property.page-type.types.ts"

export const overwhereISkillCharacter = {
  id: "01a0ed15-c07b-72c2-b6e5-c7ed60da39aa",
  type: "page-type/relation-property",
  slug: "overwhere-i-skill-character",
  propertySlug: "character",
  definition: "the character holding a skill in Overwhere I",
  targetPageType: "page-type/world-character",
  types: "ts",
} as const satisfies RelationProperty
