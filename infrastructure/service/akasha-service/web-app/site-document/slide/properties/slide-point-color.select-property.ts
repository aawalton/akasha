import type { SelectProperty } from "akasha/page/select-property/select-property.page-type.types.ts"

export const slidePointColor = {
  id: "01a0d622-64e3-7dad-b02e-0ff06533798e",
  type: "page-type/select-property",
  slug: "slide-point-color",
  propertySlug: "color",
  definition: "the color a slide's point is marked in",
  values: ["red", "yellow", "green", "blue"],
  types: "ts",
} as const satisfies SelectProperty
