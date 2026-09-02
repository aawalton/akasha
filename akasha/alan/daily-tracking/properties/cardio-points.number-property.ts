import type { NumberProperty } from "@akasha/pages-system/number-property"

export type CardioPoints = number

export const cardioPoints = {
  id: "01a05fd8-c30f-7633-9175-27c131101f98",
  pageTypeSlug: "number-property",
  slug: "cardio-points",
  propertySlug: "cardio-points",
  definition: "the cardio earned on a day",
  max: null,
} as const satisfies NumberProperty
