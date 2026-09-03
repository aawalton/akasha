import type { NumberProperty } from "@akasha/pages-system/number-property"

export type ModelYear = number

export const modelYear = {
  id: "01a06599-35ba-7d61-a1ab-ccf8f4ec54a8",
  pageTypeSlug: "number-property",
  slug: "modelYear",
  propertySlug: "modelYear",
  definition: "the model year",
  max: null,
} as const satisfies NumberProperty
