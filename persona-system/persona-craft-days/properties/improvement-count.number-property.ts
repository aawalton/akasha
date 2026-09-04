import type { NumberProperty } from "@akasha/pages-system/number-property"

export type ImprovementCount = number

export const improvementCount = {
  id: "01a0655b-4a9b-7006-8ee7-6fd6e7b981b8",
  pageTypeSlug: "number-property",
  slug: "improvement-count",
  propertySlug: "improvement-count",
  definition: "how many personas already standing were bettered on a day",
  max: null,
} as const satisfies NumberProperty
