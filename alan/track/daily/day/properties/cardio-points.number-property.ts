import type { NumberProperty } from "akasha/page/number-property/number-property.page-type.types.ts"

export const cardioPoints = {
  id: "01a05fd8-c30f-7633-9175-27c131101f98",
  type: "page-type/number-property",
  slug: "cardio-points",
  propertySlug: "cardio-points",
  definition: "the cardio earned on a day",
  max: null,
  types: "ts",
} as const satisfies NumberProperty
