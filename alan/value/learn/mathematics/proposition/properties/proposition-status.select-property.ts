import type { SelectProperty } from "akasha/page/select-property/select-property.page-type.types.ts"

export const propositionStatus = {
  id: "01a06575-c2ac-797b-b1d3-d6847cb7c62a",
  type: "page-type/select-property",
  slug: "proposition-status",
  propertySlug: "proposition-status",
  definition: "how far Alan has settled a proposition",
  values: ["open", "adopted", "proved", "parked"],
  types: "ts",
  createdAt: "2026-09-03T04:10:11.500Z",
  updatedAt: "2026-10-30T16:45:15.901Z",
} as const satisfies SelectProperty
