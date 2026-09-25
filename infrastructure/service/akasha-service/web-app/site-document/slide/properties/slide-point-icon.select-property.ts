import type { SelectProperty } from "akasha/page/select-property/select-property.page-type.types.ts"

export const slidePointIcon = {
  id: "01a0d622-64e3-7425-9f6b-07a7f4adf721",
  type: "page-type/select-property",
  slug: "slide-point-icon",
  propertySlug: "icon",
  definition: "the picture a slide's point is shown beside",
  values: ["brain", "code", "heart-pulse", "gauge"],
  types: "ts",
} as const satisfies SelectProperty
