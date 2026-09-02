import type { NumberProperty } from "@akasha/pages-system/number-property"

export type HealthBelow = number

export const healthBelow = {
  id: "01a06193-6cae-7ee6-b94c-69630c96ddf2",
  pageTypeSlug: "number-property",
  slug: "health-below",
  propertySlug: "below",
  definition: "the share of health a test reads under",
  max: null,
} as const satisfies NumberProperty
