import type { NumberProperty } from "@akasha/pages-system/number-property"

export type ValueNum = number

export const valueNum = {
  id: "01a05fcf-246a-7166-9fd2-c5c6de104fae",
  pageTypeSlug: "number-property",
  slug: "value-num",
  propertySlug: "value-num",
  definition: "the number a constant holds",
  max: null,
} as const satisfies NumberProperty
