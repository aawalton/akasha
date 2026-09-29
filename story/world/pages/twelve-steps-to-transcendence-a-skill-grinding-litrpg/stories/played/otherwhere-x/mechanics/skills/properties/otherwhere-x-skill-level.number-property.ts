import type { NumberProperty } from "akasha/page/number-property/number-property.page-type.types.ts"

export const otherwhereXSkillLevel = {
  id: "01a0ea7c-4061-77ae-81fd-9fc49e42e71b",
  type: "page-type/number-property",
  slug: "otherwhere-x-skill-level",
  propertySlug: "level",
  definition: "the level a skill held in Otherwhere X has reached within its rarity",
  nullable: false,
  max: null,
  types: "ts",
} as const satisfies NumberProperty
