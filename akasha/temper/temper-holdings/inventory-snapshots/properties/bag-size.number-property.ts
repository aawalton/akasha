import type { NumberProperty } from "@akasha/pages-system/number-property"

export type BagSize = number

export const bagSize = {
  id: "01a0675a-f185-7b1f-abf5-b815387da28a",
  pageTypeSlug: "number-property",
  slug: "bag-size",
  propertySlug: "bag-size",
  definition: "how many slots a bag holds",
  max: null,
} as const satisfies NumberProperty
