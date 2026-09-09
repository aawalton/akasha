import type { NumberProperty } from "@akasha/pages/number-property"

export type HeldBy = number

export const heldBy = {
  id: "01a0819d-95e2-7b52-9ef7-6096e69c4ba1",
  pageTypeSlug: "number-property",
  type: "number-property",
  slug: "held-by",
  propertySlug: "held-by",
  definition: "the issue an addon was taken over under",
  max: null,
} as const satisfies NumberProperty
