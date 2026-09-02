import type { NumberProperty } from "@akasha/pages-system/number-property"

export type MinPrice = number

export const minPrice = {
  id: "01a06053-b380-7e76-b2ba-223b0a8e15ed",
  pageTypeSlug: "number-property",
  slug: "min-price",
  propertySlug: "min-price",
  definition: "the lowest gold an item is listed at",
  max: null,
} as const satisfies NumberProperty
