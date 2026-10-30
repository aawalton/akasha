import type { SelectProperty } from "akasha/page/select-property/select-property.page-type.types.ts"

export const chessOutcome = {
  id: "01a06582-bd62-7dba-bf3d-2305634deb70",
  type: "page-type/select-property",
  slug: "chess-outcome",
  propertySlug: "outcome",
  definition: "how a game ends for Alan",
  values: ["win", "loss", "draw"],
  types: "ts",
  createdAt: "2026-09-03T04:24:22.114Z",
  updatedAt: "2026-10-30T15:05:18.743Z",
} as const satisfies SelectProperty
