import type { NumberProperty } from "@akasha/pages-system/number-property"

export type ImplementCount = number

export const implementCount = {
  id: "01a0657e-2bbf-72d4-a1ad-9a722f217cab",
  pageTypeSlug: "number-property",
  slug: "implement-count",
  propertySlug: "implement-count",
  definition: "how many pieces of kit are loaded at once, so a pair of dumbbells counts twice",
  max: null,
} as const satisfies NumberProperty
