import type { RelationProperty } from "akasha/page/relation-property/relation-property.page-type.types.ts"

export const partnersSkillSkill = {
  id: "01a0de4a-ee33-7b86-8876-a2dba57c4ae7",
  type: "page-type/relation-property",
  slug: "partners-skill-skill",
  propertySlug: "skill",
  definition: "the skill of the world a skill held in Partners is a holding of",
  targetPageType: "page-type/world-skill",
  types: "ts",
} as const satisfies RelationProperty
