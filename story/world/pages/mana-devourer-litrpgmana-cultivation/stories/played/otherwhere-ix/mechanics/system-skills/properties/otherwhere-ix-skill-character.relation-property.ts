import type { RelationProperty } from "akasha/page/relation-property/relation-property.page-type.types.ts"

export const otherwhereIxSkillCharacter = {
  id: "01a0ea43-35ef-7a53-abc0-15bf1b099fd9",
  type: "page-type/relation-property",
  slug: "otherwhere-ix-skill-character",
  propertySlug: "character",
  definition: "the character holding a skill in Otherwhere IX",
  targetPageType: "page-type/world-character",
  types: "ts",
} as const satisfies RelationProperty
