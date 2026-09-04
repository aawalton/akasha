import type { SelectProperty } from "@akasha/pages-system/select-property"

export const laterality = {
  id: "01a0657e-2bbf-7361-b107-9e463ab38778",
  pageTypeSlug: "select-property",
  slug: "laterality",
  propertySlug: "laterality",
  definition: "whether the sides work together, apart, or in turn",
  values: ["alternating", "bilateral", "unilateral"],
} as const satisfies SelectProperty

export type Laterality = (typeof laterality.values)[number]
