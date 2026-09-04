import type { NumberProperty } from "@akasha/pages-system/number-property"

export type Threshold = number

export const threshold = {
  id: "01a06579-e4f7-7121-8179-b21785f74250",
  pageTypeSlug: "number-property",
  slug: "threshold",
  propertySlug: "threshold",
  definition: "the number a metric reaches when the achievement is earned",
  max: null,
} as const satisfies NumberProperty
