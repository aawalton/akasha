import type { NumberProperty } from "akasha/page/number-property/number-property.page-type.types.ts"

export const partnersSkillUses = {
  id: "01a0de4a-ee33-7742-92e4-fc75c66057d3",
  type: "page-type/number-property",
  slug: "partners-skill-uses",
  propertySlug: "uses",
  definition: "how many times a skill in Partners has been used",
  nullable: false,
  max: null,
  types: "ts",
} as const satisfies NumberProperty
