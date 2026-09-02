import type { NumberProperty } from "@akasha/pages-system/number-property"

export type MinDistance = number

export const minDistance = {
  id: "01a06193-6cae-74eb-9666-ab5d3a84eeb1",
  pageTypeSlug: "number-property",
  slug: "min-distance",
  propertySlug: "min-distance",
  definition: "the nearest range a test holds at",
  max: null,
} as const satisfies NumberProperty
