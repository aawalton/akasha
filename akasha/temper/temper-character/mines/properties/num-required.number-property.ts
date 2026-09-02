import type { NumberProperty } from "@akasha/pages-system/number-property"

export type NumRequired = number

export const numRequired = {
  id: "01a05fcd-f552-747a-9d38-842aa35260d0",
  pageTypeSlug: "number-property",
  slug: "num-required",
  propertySlug: "num-required",
  definition: "how many pieces of a set a bonus asks for",
  max: null,
} as const satisfies NumberProperty
