import type { RelationProperty } from "akasha/page/relation-property/relation-property.page-type.types.ts"

export const skillCharacter = {
  id: "01a10362-0c7c-788b-bb3f-831bbc7563e6",
  type: "page-type/relation-property",
  slug: "skill-character",
  propertySlug: "character",
  definition: "the character a skill held is the skill of",
  targetPageType: "page-type/world-character",
  types: "ts",
} as const satisfies RelationProperty
