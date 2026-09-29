import type { NumberProperty } from "akasha/page/number-property/number-property.page-type.types.ts"

export const otherwhereXiSkillLevel = {
  id: "01a0ea89-63a3-7d3f-9eb4-8aba49541dfd",
  type: "page-type/number-property",
  slug: "otherwhere-xi-skill-level",
  propertySlug: "level",
  definition: "the level, one to nine, a skill in Otherwhere XI has reached within its rank",
  nullable: false,
  max: 9,
  types: "ts",
} as const satisfies NumberProperty
