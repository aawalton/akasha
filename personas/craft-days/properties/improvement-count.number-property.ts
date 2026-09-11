import type { NumberProperty } from "akasha/pages/number-properties/number-property.page-type.types.ts"

export const improvementCount = {
  id: "01a0655b-4a9b-7006-8ee7-6fd6e7b981b8",
  type: "number-property",
  slug: "improvement-count",
  propertySlug: "improvement-count",
  definition: "how many personas that already existed were bettered on a day",
  max: null,
  types: "ts",
} as const satisfies NumberProperty
