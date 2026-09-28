import type { NumberProperty } from "akasha/page/number-property/number-property.page-type.types.ts"

export const otherwhereViSkillStaminaCost = {
  id: "01a0ea48-4646-79c7-ad80-4fd80e41223d",
  type: "page-type/number-property",
  slug: "otherwhere-vi-skill-stamina-cost",
  propertySlug: "stamina-cost",
  definition: "the SP a skill in Otherwhere VI takes each time it is used",
  nullable: false,
  max: null,
  types: "ts",
} as const satisfies NumberProperty
