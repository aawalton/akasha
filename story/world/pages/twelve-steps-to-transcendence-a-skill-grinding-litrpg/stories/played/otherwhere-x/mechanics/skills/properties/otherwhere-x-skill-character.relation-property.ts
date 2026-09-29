import type { RelationProperty } from "akasha/page/relation-property/relation-property.page-type.types.ts"

export const otherwhereXSkillCharacter = {
  id: "01a0ea7c-4061-75ea-a07d-2c388df3d2a7",
  type: "page-type/relation-property",
  slug: "otherwhere-x-skill-character",
  propertySlug: "character",
  definition: "the character holding a skill in Otherwhere X",
  targetPageType: "page-type/world-character",
  types: "ts",
} as const satisfies RelationProperty
