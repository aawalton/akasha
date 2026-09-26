import type { RelationProperty } from "akasha/page/relation-property/relation-property.page-type.types.ts"

export const towerSkillSkill = {
  id: "01a0de38-6904-7a1f-9e70-06ff4082bec7",
  type: "page-type/relation-property",
  slug: "tower-skill-skill",
  propertySlug: "skill",
  definition: "the skill of the world a skill held in the Tower is a holding of",
  targetPageType: "page-type/world-skill",
  types: "ts",
} as const satisfies RelationProperty
