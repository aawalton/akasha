import type { SelectProperty } from "akasha/page/select-property/select-property.page-type.types.ts"

export const playerColor = {
  id: "01a06582-bd62-7f64-abc7-2bde8817177b",
  type: "page-type/select-property",
  slug: "player-color",
  propertySlug: "player-color",
  definition: "which side Alan played",
  values: ["white", "black"],
  types: "ts",
  createdAt: "2026-09-03T04:24:22.114Z",
  updatedAt: "2026-09-15T16:59:44.000Z",
} as const satisfies SelectProperty
