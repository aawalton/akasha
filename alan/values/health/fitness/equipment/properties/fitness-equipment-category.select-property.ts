import type { SelectProperty } from "akasha/pages/select-properties/select-property.page-type.types.ts"

export const fitnessEquipmentCategory = {
  id: "01a06865-7f45-7967-91d8-74b7b421ef60",
  type: "select-property",
  slug: "fitness-equipment-category",
  propertySlug: "category",
  definition: "the sort of kit a piece is",
  values: ["dumbbells", "kettlebells", "bench", "band", "vest", "cardio-machine", "other"],
  types: "ts",
} as const satisfies SelectProperty
