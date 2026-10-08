import type { SelectProperty } from "akasha/page/select-property/select-property.page-type.types.ts"

export const fitnessEquipmentCategory = {
  id: "01a06865-7f45-7967-91d8-74b7b421ef60",
  type: "page-type/select-property",
  slug: "fitness-equipment-category",
  propertySlug: "category",
  definition: "the sort of kit a piece is",
  values: ["dumbbells", "kettlebells", "bench", "band", "vest", "cardio-machine", "other"],
  types: "ts",
  createdAt: "2026-09-03T17:51:17.317Z",
  updatedAt: "2026-09-15T16:59:44.000Z",
} as const satisfies SelectProperty
