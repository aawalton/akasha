import type { NumberProperty } from "akasha/page/number-property/number-property.page-type.types.ts"

export const armorMultiplier = {
  id: "01a05fd1-d436-747d-9b85-c19e00005b75",
  type: "page-type/number-property",
  slug: "armor-multiplier",
  propertySlug: "armor-multiplier",
  definition: "the share of a weight's armor a piece of this kind carries",
  max: null,
  types: "ts",
} as const satisfies NumberProperty
