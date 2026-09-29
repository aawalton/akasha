import type { NumberProperty } from "akasha/page/number-property/number-property.page-type.types.ts"

export const overwhereISkillLevel = {
  id: "01a0ed15-c07b-7dea-a087-05d5ac470653",
  type: "page-type/number-property",
  slug: "overwhere-i-skill-level",
  propertySlug: "level",
  definition: "the level a skill held in Overwhere I has reached",
  nullable: false,
  max: 10,
  types: "ts",
} as const satisfies NumberProperty
