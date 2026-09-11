import type { NumberProperty } from "akasha/pages/number-properties/number-property.page-type.types.ts"

export const accuracyM = {
  id: "01a06935-68b2-7b97-8c49-7df243d3b26a",
  type: "number-property",
  slug: "accuracy-m",
  propertySlug: "accuracy-m",
  definition: "how far from the stated position the device thinks the truth could be, in metres",
  max: null,
  types: "ts",
} as const satisfies NumberProperty
