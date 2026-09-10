import type { NumberProperty } from "akasha/pages/number-properties/number-property.page-type.types.ts"

export const healthPoints = {
  id: "01a05fd8-c30f-7567-85c3-91d74be72a9f",
  pageTypeSlug: "number-property",
  type: "number-property",
  slug: "health-points",
  propertySlug: "health-points",
  definition: "the health earned on a day",
  max: null,
  types: "ts",
} as const satisfies NumberProperty
