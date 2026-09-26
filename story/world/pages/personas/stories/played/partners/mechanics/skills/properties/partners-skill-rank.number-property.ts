import type { NumberProperty } from "akasha/page/number-property/number-property.page-type.types.ts"

export const partnersSkillRank = {
  id: "01a0de4a-ee33-70ac-8d91-4d1c7e2b169a",
  type: "page-type/number-property",
  slug: "partners-skill-rank",
  propertySlug: "rank",
  definition: "the rank a skill in Partners has reached",
  nullable: false,
  max: null,
  types: "ts",
} as const satisfies NumberProperty
