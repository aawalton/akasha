import type { SelectProperty } from "akasha/page/select-property/select-property.page-type.types.ts"

export const slideKind = {
  id: "01a0d622-64e3-7587-97ea-18ee6127ad12",
  type: "page-type/select-property",
  slug: "slide-kind",
  propertySlug: "kind",
  definition: "the layout a slide is shown in",
  values: ["title", "about", "agenda", "level", "cta"],
  types: "ts",
} as const satisfies SelectProperty
