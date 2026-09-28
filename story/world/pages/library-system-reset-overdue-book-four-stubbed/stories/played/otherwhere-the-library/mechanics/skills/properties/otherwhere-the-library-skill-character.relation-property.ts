import type { RelationProperty } from "akasha/page/relation-property/relation-property.page-type.types.ts"

export const otherwhereTheLibrarySkillCharacter = {
  id: "01a0e7f8-cd1e-7017-8dea-a4acd8b9fd5e",
  type: "page-type/relation-property",
  slug: "otherwhere-the-library-skill-character",
  propertySlug: "character",
  definition: "the character holding a skill in Otherwhere",
  targetPageType: "page-type/world-character",
  types: "ts",
} as const satisfies RelationProperty
