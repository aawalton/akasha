import type { SelectProperty } from "akasha/page/select-property/select-property.page-type.types.ts"

export const fitnessEquipmentCategory = {
  id: "01a06865-7f45-7967-91d8-74b7b421ef60",
  type: "page-type/select-property",
  slug: "fitness-equipment-category",
  propertySlug: "category",
  definition: "the kind of a piece of fitness equipment",
  values: ["dumbbells", "kettlebells", "bench", "band", "vest", "cardio-machine", "other"],
  types: "ts",
  createdAt: "2026-09-03T17:51:17.317Z",
  updatedAt: "2026-10-30T16:47:28.425Z",
} as const satisfies SelectProperty
