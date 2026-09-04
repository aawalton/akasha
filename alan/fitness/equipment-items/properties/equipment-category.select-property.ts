import type { SelectProperty } from "@akasha/pages-system/select-property"

export const equipmentCategory = {
  id: "01a06865-7f45-7967-91d8-74b7b421ef60",
  pageTypeSlug: "select-property",
  slug: "equipment-category",
  propertySlug: "category",
  definition: "the sort of kit a piece is",
  values: ["dumbbells", "kettlebells", "bench", "band", "vest", "cardio-machine", "other"],
} as const satisfies SelectProperty

export type EquipmentCategory = (typeof equipmentCategory.values)[number]
