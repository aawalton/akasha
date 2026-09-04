import type { NumberProperty } from "@akasha/pages-system/number-property"

export type WealthPoints = number

export const wealthPoints = {
  id: "01a05fd8-c30f-70a3-82f7-3cba4042e6ab",
  pageTypeSlug: "number-property",
  slug: "wealth-points",
  propertySlug: "wealth-points",
  definition: "the wealth earned on a day",
  max: null,
} as const satisfies NumberProperty
