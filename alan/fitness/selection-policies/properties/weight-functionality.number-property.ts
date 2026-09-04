import type { NumberProperty } from "@akasha/pages-system/number-property"

export type WeightFunctionality = number

export const weightFunctionality = {
  id: "01a06865-7f45-7940-abd7-09b6c5b199ce",
  pageTypeSlug: "number-property",
  slug: "weight-functionality",
  propertySlug: "weight-functionality",
  definition: "how much moving well counts when a movement is weighed",
  max: null,
} as const satisfies NumberProperty
