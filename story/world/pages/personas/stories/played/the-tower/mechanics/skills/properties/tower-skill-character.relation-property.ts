import type { RelationProperty } from "akasha/page/relation-property/relation-property.page-type.types.ts"

export const towerSkillCharacter = {
  id: "01a0de38-6904-7c2d-8fa4-cddabf2b88c3",
  type: "page-type/relation-property",
  slug: "tower-skill-character",
  propertySlug: "character",
  definition: "the character holding a skill in the Tower",
  targetPageType: "page-type/world-character",
  types: "ts",
  createdAt: "2026-09-26T14:57:13.988Z",
  updatedAt: "2026-09-26T17:44:02.000Z",
} as const satisfies RelationProperty
