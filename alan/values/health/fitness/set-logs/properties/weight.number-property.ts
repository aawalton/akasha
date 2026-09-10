import type { NumberProperty } from "akasha/pages/number-properties/number-property.page-type.types.ts"

export const weight = {
  id: "01a06580-66fd-73f6-b99d-b9315e7fbacd",
  pageTypeSlug: "number-property",
  type: "number-property",
  slug: "weight",
  propertySlug: "weight",
  definition: "the load on one implement, in pounds",
  max: null,
  types: "ts",
} as const satisfies NumberProperty
