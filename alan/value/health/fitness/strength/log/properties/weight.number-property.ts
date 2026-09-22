import type { NumberProperty } from "akasha/page/number-property/number-property.page-type.types.ts"

export const weight = {
  id: "01a06580-66fd-73f6-b99d-b9315e7fbacd",
  type: "page-type/number-property",
  slug: "weight",
  propertySlug: "weight",
  definition: "the load on an implement, in pounds",
  max: null,
  types: "ts",
} as const satisfies NumberProperty
