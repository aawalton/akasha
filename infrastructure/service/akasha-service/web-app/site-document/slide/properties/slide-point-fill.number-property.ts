import type { NumberProperty } from "akasha/page/number-property/number-property.page-type.types.ts"

export const slidePointFill = {
  id: "01a0d622-64e3-7efa-a9aa-6339c1d6952c",
  type: "page-type/number-property",
  slug: "slide-point-fill",
  propertySlug: "fill",
  definition: "how full the bar a slide's point shows is, from 0 to 1",
  max: 1,
  types: "ts",
} as const satisfies NumberProperty
