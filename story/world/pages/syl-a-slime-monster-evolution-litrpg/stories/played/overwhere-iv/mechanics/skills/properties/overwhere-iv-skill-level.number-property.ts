import type { NumberProperty } from "akasha/page/number-property/number-property.page-type.types.ts"

export const overwhereIvSkillLevel = {
  id: "01a0ed1b-1aed-790b-a63f-4ccd5e973161",
  type: "page-type/number-property",
  slug: "overwhere-iv-skill-level",
  propertySlug: "level",
  definition: "the level a skill held in Overwhere IV has reached",
  nullable: false,
  max: 10,
  types: "ts",
} as const satisfies NumberProperty
