import type { SelectProperty } from "@akasha/pages-system/select-property"

export const equipmentItemCategory = {
  id: "01a0685c-7d81-73c0-aa9c-d50017943623",
  pageTypeSlug: "select-property",
  slug: "equipment-item-category",
  propertySlug: "equipment-item-category",
  definition: "the sort of kit the piece is",
  values: ["dumbbells", "kettlebells", "bench", "band", "vest", "cardio-machine", "other"],
} as const satisfies SelectProperty

export type EquipmentItemCategory = (typeof equipmentItemCategory.values)[number]
