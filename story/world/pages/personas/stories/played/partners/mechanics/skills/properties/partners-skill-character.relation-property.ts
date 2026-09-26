import type { RelationProperty } from "akasha/page/relation-property/relation-property.page-type.types.ts"

export const partnersSkillCharacter = {
  id: "01a0de4a-ee33-72ee-9969-c33ed3ac375b",
  type: "page-type/relation-property",
  slug: "partners-skill-character",
  propertySlug: "character",
  definition: "the character holding a skill in Partners",
  targetPageType: "page-type/character",
  types: "ts",
} as const satisfies RelationProperty
