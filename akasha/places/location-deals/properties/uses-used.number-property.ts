import type { NumberProperty } from "@akasha/pages-system/number-property"

export type UsesUsed = number

export const usesUsed = {
  id: "01a06585-5fc5-7c3b-a2b4-918e5ffce194",
  pageTypeSlug: "number-property",
  slug: "uses-used",
  propertySlug: "uses-used",
  definition: "how many times the offer has been claimed",
  max: null,
} as const satisfies NumberProperty
