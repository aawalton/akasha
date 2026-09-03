import type { SelectProperty } from "@akasha/pages-system/select-property"

export const laterality = {
  id: "01a0657b-1ad2-70ae-a417-b7de8693be6b",
  pageTypeSlug: "select-property",
  slug: "laterality",
  propertySlug: "laterality",
  definition: "whether the sides work together, apart, or in turn",
  values: ["alternating", "bilateral", "unilateral"],
} as const satisfies SelectProperty

export type Laterality = (typeof laterality.values)[number]
