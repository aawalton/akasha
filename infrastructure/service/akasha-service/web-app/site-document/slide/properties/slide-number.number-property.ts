import type { NumberProperty } from "akasha/page/number-property/number-property.page-type.types.ts"

export const slideNumber = {
  id: "01a0d622-64e3-77d9-97b4-62e7b5fd6468",
  type: "page-type/number-property",
  slug: "slide-number",
  propertySlug: "number",
  definition: "where a slide falls in its deck, counted from zero",
  max: null,
  types: "ts",
} as const satisfies NumberProperty
