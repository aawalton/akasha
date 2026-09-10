import type { NumberProperty } from "akasha/pages/number-properties/number-property.page-type.types.ts"

export type RatePerSec = number

export const ratePerSec = {
  id: "01a06596-f0d5-7001-a794-bfa5abc046e4",
  pageTypeSlug: "number-property",
  type: "number-property",
  slug: "rate-per-sec",
  propertySlug: "rate-per-sec",
  definition: "what a card earns every second it is left running",
  max: null,
} as const satisfies NumberProperty
