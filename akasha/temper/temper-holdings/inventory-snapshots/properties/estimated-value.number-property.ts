import type { NumberProperty } from "@akasha/pages-system/number-property"

export type EstimatedValue = number

export const estimatedValue = {
  id: "01a06053-b37d-7603-aa73-880a2e6d55eb",
  pageTypeSlug: "number-property",
  slug: "estimated-value",
  propertySlug: "estimated-value",
  definition: "what an item is reckoned to be worth in gold",
  max: null,
} as const satisfies NumberProperty
