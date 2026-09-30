import type { RelationProperty } from "akasha/page/relation-property/relation-property.page-type.types.ts"

export const overwhereISpeciesCharacter = {
  id: "01a0f1b7-9f9a-7260-b8ed-d8507c835425",
  type: "page-type/relation-property",
  slug: "overwhere-i-species-character",
  propertySlug: "character",
  definition: "the character whose species a species held in Overwhere I is",
  targetPageType: "page-type/world-character",
  types: "ts",
} as const satisfies RelationProperty
