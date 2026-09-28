import type { NumberProperty } from "akasha/page/number-property/number-property.page-type.types.ts"

export const otherwhereViSkillLevel = {
  id: "01a0ea48-4646-7922-9559-ad9d813e137b",
  type: "page-type/number-property",
  slug: "otherwhere-vi-skill-level",
  propertySlug: "level",
  definition: "the level a skill in Otherwhere VI has reached",
  nullable: false,
  max: null,
  types: "ts",
} as const satisfies NumberProperty
