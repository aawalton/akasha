import type { SelectProperty } from "akasha/page/select-property/select-property.page-type.types.ts"

export const laterality = {
  id: "01a0657e-2bbf-7361-b107-9e463ab38778",
  type: "page-type/select-property",
  slug: "laterality",
  propertySlug: "laterality",
  definition: "whether the sides work together, apart, or in turn",
  values: ["alternating", "bilateral", "unilateral"],
  types: "ts",
  createdAt: "2026-09-03T04:19:22.687Z",
  updatedAt: "2026-09-15T16:59:44.000Z",
} as const satisfies SelectProperty
