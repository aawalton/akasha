import type { RelationProperty } from "akasha/page/relation-property/relation-property.page-type.types.ts"

export const overwhereIvSkillCharacter = {
  id: "01a0ed1b-1aed-7115-95a2-ed2207f31a89",
  type: "page-type/relation-property",
  slug: "overwhere-iv-skill-character",
  propertySlug: "character",
  definition: "the character holding a skill in Overwhere IV",
  targetPageType: "page-type/world-character",
  types: "ts",
} as const satisfies RelationProperty
