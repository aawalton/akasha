import type { RelationProperty } from "akasha/page/relation-property/relation-property.page-type.types.ts"

export const otherwhereXiSkillCharacter = {
  id: "01a0ea89-63a3-7413-bc32-473a5253b81f",
  type: "page-type/relation-property",
  slug: "otherwhere-xi-skill-character",
  propertySlug: "character",
  definition: "the character holding a skill in Otherwhere XI",
  targetPageType: "page-type/world-character",
  types: "ts",
} as const satisfies RelationProperty
