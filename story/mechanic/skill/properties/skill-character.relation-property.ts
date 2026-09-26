import type { RelationProperty } from "akasha/page/relation-property/relation-property.page-type.types.ts"

export const skillCharacter = {
  id: "01a0de16-90df-7c77-87f2-1c924ff775de",
  type: "page-type/relation-property",
  slug: "skill-character",
  propertySlug: "character",
  definition: "the character a skill is of",
  targetPageType: "page-type/character",
  types: "ts",
} as const satisfies RelationProperty
