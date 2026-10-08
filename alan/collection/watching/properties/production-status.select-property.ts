import type { SelectProperty } from "akasha/page/select-property/select-property.page-type.types.ts"

export const productionStatus = {
  id: "01a06599-ee09-700c-bf83-88a35f46a2d3",
  type: "page-type/select-property",
  slug: "production-status",
  propertySlug: "production-status",
  definition: "how far along the making of a show or a film is",
  values: ["ended", "released"],

  types: "ts",
  createdAt: "2026-09-03T04:49:41.897Z",
  updatedAt: "2026-09-25T12:50:49.000Z",
} as const satisfies SelectProperty
