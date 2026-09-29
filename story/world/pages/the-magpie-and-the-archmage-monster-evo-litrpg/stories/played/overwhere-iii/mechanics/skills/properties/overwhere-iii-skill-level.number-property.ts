import type { NumberProperty } from "akasha/page/number-property/number-property.page-type.types.ts"

export const overwhereIiiSkillLevel = {
  id: "01a0ed2d-2c5e-7416-aaa7-e42d605033cb",
  type: "page-type/number-property",
  slug: "overwhere-iii-skill-level",
  propertySlug: "level",
  definition:
    "the skill level, from Basic as one to Legend as five, a skill held in Overwhere III has",
  nullable: false,
  max: 5,
  types: "ts",
} as const satisfies NumberProperty
