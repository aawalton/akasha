import type { NumberProperty } from "@akasha/pages-system/number-property"

export type HealthPoints = number

export const healthPoints = {
  id: "01a05fd8-c30f-7567-85c3-91d74be72a9f",
  pageTypeSlug: "number-property",
  slug: "health-points",
  propertySlug: "health-points",
  definition: "the health earned on a day",
  max: null,
} as const satisfies NumberProperty
