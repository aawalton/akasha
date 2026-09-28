import type { NumberProperty } from "akasha/page/number-property/number-property.page-type.types.ts"

export const otherwhereIxSkillLevel = {
  id: "01a0ea43-35f0-75c8-aa1b-fa246932eb3c",
  type: "page-type/number-property",
  slug: "otherwhere-ix-skill-level",
  propertySlug: "level",
  definition: "the level a skill in Otherwhere IX has reached",
  nullable: false,
  max: null,
  types: "ts",
} as const satisfies NumberProperty
