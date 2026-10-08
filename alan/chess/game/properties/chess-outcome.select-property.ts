import type { SelectProperty } from "akasha/page/select-property/select-property.page-type.types.ts"

export const chessOutcome = {
  id: "01a06582-bd62-7dba-bf3d-2305634deb70",
  type: "page-type/select-property",
  slug: "chess-outcome",
  propertySlug: "outcome",
  definition: "how a game went for Alan",
  values: ["win", "loss", "draw"],
  types: "ts",
  createdAt: "2026-09-03T04:24:22.114Z",
  updatedAt: "2026-09-15T16:59:44.000Z",
} as const satisfies SelectProperty
