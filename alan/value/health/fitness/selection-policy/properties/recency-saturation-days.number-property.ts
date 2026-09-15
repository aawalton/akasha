import type { NumberProperty } from "akasha/page/number-property/number-property.page-type.types.ts"

export const recencySaturationDays = {
  id: "01a06865-7f46-7a1c-983d-4d5302c70a8f",
  type: "page-type/number-property",
  slug: "recency-saturation-days",
  propertySlug: "recency-saturation-days",
  definition: "how many days pass before doing a movement lately counts for nothing",
  max: null,
  types: "ts",
} as const satisfies NumberProperty
