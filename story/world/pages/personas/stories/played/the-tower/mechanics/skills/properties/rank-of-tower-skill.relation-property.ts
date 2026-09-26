import type { RelationProperty } from "akasha/page/relation-property/relation-property.page-type.types.ts"

export const rankOfTowerSkill = {
  id: "01a0de18-0b6f-756b-a091-cac5b7f418d3",
  type: "page-type/relation-property",
  slug: "rank-of-tower-skill",
  propertySlug: "rank",
  definition: "the rank a skill in the Tower is at",
  targetPageType: "page-type/tower-skill-rank",
  types: "ts",
} as const satisfies RelationProperty
