import type { NumberProperty } from "akasha/page/number-property/number-property.page-type.types.ts"

export const towerSkillRankWidth = {
  id: "01a0de18-0b70-71e4-89ff-0d0646813ec8",
  type: "page-type/number-property",
  slug: "tower-skill-rank-width",
  propertySlug: "width",
  definition: "the levels a skill climbs to cross a rank",
  nullable: false,
  max: null,
  types: "ts",
} as const satisfies NumberProperty
