import type { NumberProperty } from "akasha/page/number-property/number-property.page-type.types.ts"

export const partnersIiSkillRank = {
  id: "01a0de4b-431d-70d7-9d98-5224b6c93707",
  type: "page-type/number-property",
  slug: "partners-ii-skill-rank",
  propertySlug: "rank",
  definition: "the rank a skill in Partners II has reached",
  nullable: false,
  max: null,
  types: "ts",
} as const satisfies NumberProperty
