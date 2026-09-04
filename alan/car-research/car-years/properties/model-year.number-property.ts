import type { NumberProperty } from "@akasha/pages-system/number-property"

export type ModelYear = number

export const modelYear = {
  id: "01a0659d-2433-7931-ac46-ee8127491773",
  pageTypeSlug: "number-property",
  slug: "model-year",
  propertySlug: "model-year",
  definition: "the model year",
  max: null,
} as const satisfies NumberProperty
