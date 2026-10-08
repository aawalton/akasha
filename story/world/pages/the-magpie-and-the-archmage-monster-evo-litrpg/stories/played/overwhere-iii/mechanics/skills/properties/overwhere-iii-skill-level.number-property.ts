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
  createdAt: "2026-09-29T12:39:15.806Z",
  updatedAt: "2026-09-29T12:39:22.000Z",
} as const satisfies NumberProperty
