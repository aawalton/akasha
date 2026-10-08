import type { SelectProperty } from "akasha/page/select-property/select-property.page-type.types.ts"

export const slideKind = {
  id: "01a0d622-64e3-7587-97ea-18ee6127ad12",
  type: "page-type/select-property",
  slug: "slide-kind",
  propertySlug: "kind",
  definition: "the layout a slide is shown in",
  values: ["title", "about", "agenda", "level", "cta"],
  types: "ts",
  createdAt: "2026-09-25T01:16:13.411Z",
  updatedAt: "2026-09-25T01:16:17.000Z",
} as const satisfies SelectProperty
