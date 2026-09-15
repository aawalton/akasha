import type { NumberProperty } from "akasha/page/number-property/number-property.page-type.types.ts"

export const ratePerSec = {
  id: "01a06596-f0d5-7001-a794-bfa5abc046e4",
  type: "page-type/number-property",
  slug: "rate-per-sec",
  propertySlug: "rate-per-sec",
  definition: "what a card earns every second it is left running",
  max: null,
  types: "ts",
} as const satisfies NumberProperty
