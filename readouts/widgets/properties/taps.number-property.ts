import type { NumberProperty } from "@akasha/pages/number-property"

export type Taps = number

export const taps = {
  id: "01a0789e-7d05-7c5b-80d4-d734a14fed93",
  pageTypeSlug: "number-property",
  type: "number-property",
  slug: "taps",
  propertySlug: "taps",
  definition: "how many taps a widget has taken",
  max: null,
} as const satisfies NumberProperty
