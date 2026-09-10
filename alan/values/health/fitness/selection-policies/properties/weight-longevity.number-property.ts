import type { NumberProperty } from "akasha/pages/number-properties/number-property.page-type.types.ts"

export type WeightLongevity = number

export const weightLongevity = {
  id: "01a06865-7f45-768d-8a08-b541b40a4e9f",
  pageTypeSlug: "number-property",
  type: "number-property",
  slug: "weight-longevity",
  propertySlug: "weight-longevity",
  definition: "how much staying healthy for decades counts when a movement is weighed",
  max: null,
} as const satisfies NumberProperty
