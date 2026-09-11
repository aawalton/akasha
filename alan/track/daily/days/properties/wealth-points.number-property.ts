import type { NumberProperty } from "akasha/pages/number-properties/number-property.page-type.types.ts"

export const wealthPoints = {
  id: "01a05fd8-c30f-70a3-82f7-3cba4042e6ab",
  type: "number-property",
  slug: "wealth-points",
  propertySlug: "wealth-points",
  definition: "the wealth earned on a day",
  max: null,
  types: "ts",
} as const satisfies NumberProperty
