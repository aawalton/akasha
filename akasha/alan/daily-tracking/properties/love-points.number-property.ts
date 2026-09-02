import type { NumberProperty } from "@akasha/pages-system/number-property"

export type LovePoints = number

export const lovePoints = {
  id: "01a05fd8-c30f-79ad-aad2-5a5baeafc1d0",
  pageTypeSlug: "number-property",
  slug: "love-points",
  propertySlug: "love-points",
  definition: "the love earned on a day",
  max: null,
} as const satisfies NumberProperty
