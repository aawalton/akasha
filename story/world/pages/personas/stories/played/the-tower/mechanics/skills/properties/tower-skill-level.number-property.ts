import type { NumberProperty } from "akasha/page/number-property/number-property.page-type.types.ts"

export const towerSkillLevel = {
  id: "01a0de18-0b70-78ec-9305-70a336f5905b",
  type: "page-type/number-property",
  slug: "tower-skill-level",
  propertySlug: "level",
  definition: "how far a skill has come within its rank",
  nullable: false,
  max: null,
  types: "ts",
} as const satisfies NumberProperty
