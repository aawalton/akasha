import type { RelationProperty } from "akasha/page/relation-property/relation-property.page-type.types.ts"

export const partnersIiSkillCharacter = {
  id: "01a0de4b-431d-72e0-be86-4efb293d5ff2",
  type: "page-type/relation-property",
  slug: "partners-ii-skill-character",
  propertySlug: "character",
  definition: "the character holding a skill in Partners II",
  targetPageType: "page-type/character",
  types: "ts",
} as const satisfies RelationProperty
