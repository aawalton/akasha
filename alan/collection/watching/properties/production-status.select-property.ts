import type { SelectProperty } from "akasha/page/select-property/select-property.page-type.types.ts"

export const productionStatus = {
  id: "01a06599-ee09-700c-bf83-88a35f46a2d3",
  type: "page-type/select-property",
  slug: "production-status",
  propertySlug: "production-status",
  definition: "the progress of the work on a show or a movie",
  values: ["ended", "released"],

  types: "ts",
  createdAt: "2026-09-03T04:49:41.897Z",
  updatedAt: "2026-10-30T15:20:34.641Z",
} as const satisfies SelectProperty
