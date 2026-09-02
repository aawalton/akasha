import type { NumberProperty } from "@akasha/pages-system/number-property"

export type Bag = number

export const bag = {
  id: "01a06053-b37c-75ca-9764-c04255fd1a49",
  pageTypeSlug: "number-property",
  slug: "bag",
  propertySlug: "bag",
  definition: "the bag a stack sits in, as the game numbers bags",
  max: null,
} as const satisfies NumberProperty
