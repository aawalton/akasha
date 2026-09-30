import type { RelationProperty } from "akasha/page/relation-property/relation-property.page-type.types.ts"

export const speciesCharacter = {
  id: "01a0f20b-f5ff-726c-b2fe-a4a185a7af9c",
  type: "page-type/relation-property",
  slug: "species-character",
  propertySlug: "character",
  definition: "the character a species held is the species of",
  targetPageType: "page-type/world-character",
  types: "ts",
} as const satisfies RelationProperty
