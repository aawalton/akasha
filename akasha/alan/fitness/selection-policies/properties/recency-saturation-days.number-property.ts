import type { NumberProperty } from "@akasha/pages-system/number-property"

export type RecencySaturationDays = number

export const recencySaturationDays = {
  id: "01a06865-7f46-7a1c-983d-4d5302c70a8f",
  pageTypeSlug: "number-property",
  slug: "recency-saturation-days",
  propertySlug: "recency-saturation-days",
  definition: "how many days pass before doing a movement lately counts for nothing",
  max: null,
} as const satisfies NumberProperty
