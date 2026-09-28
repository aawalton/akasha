import type { RelationProperty } from "akasha/page/relation-property/relation-property.page-type.types.ts"

export const otherwhereViSkillCharacter = {
  id: "01a0ea48-4645-752e-a522-58f35bfd8255",
  type: "page-type/relation-property",
  slug: "otherwhere-vi-skill-character",
  propertySlug: "character",
  definition: "the character holding a skill in Otherwhere VI",
  targetPageType: "page-type/world-character",
  types: "ts",
} as const satisfies RelationProperty
