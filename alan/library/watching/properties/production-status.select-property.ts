import type { SelectProperty } from "akasha/page/select-property/select-property.page-type.types.ts"

export const productionStatus = {
  id: "01a06599-ee09-700c-bf83-88a35f46a2d3",
  type: "page-type/select-property",
  slug: "production-status",
  propertySlug: "production-status",
  definition: "how far along the making of a show or a film is",
  values: ["ended", "released"],

  types: "ts",
} as const satisfies SelectProperty
