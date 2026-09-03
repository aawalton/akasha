import type { NumberProperty } from "@akasha/pages-system/number-property"

export type Weight = number

export const weight = {
  id: "01a06580-66fd-73f6-b99d-b9315e7fbacd",
  pageTypeSlug: "number-property",
  slug: "weight",
  propertySlug: "weight",
  definition: "the load on one implement, in pounds",
  max: null,
} as const satisfies NumberProperty
