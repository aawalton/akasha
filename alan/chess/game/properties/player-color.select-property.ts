import type { SelectProperty } from "akasha/page/select-property/select-property.page-type.types.ts"

export const playerColor = {
  id: "01a06582-bd62-7f64-abc7-2bde8817177b",
  type: "page-type/select-property",
  slug: "player-color",
  propertySlug: "player-color",
  definition: "the color of the pieces Alan moves in a game",
  values: ["white", "black"],
  types: "ts",
  createdAt: "2026-09-03T04:24:22.114Z",
  updatedAt: "2026-10-30T14:58:56.380Z",
} as const satisfies SelectProperty
