import type { SelectProperty } from "akasha/pages/select-properties/select-property.page-type.types.ts"

export const chessOutcome = {
  id: "01a06582-bd62-7dba-bf3d-2305634deb70",
  pageTypeSlug: "select-property",
  type: "select-property",
  slug: "chess-outcome",
  propertySlug: "outcome",
  definition: "how a game went for Alan",
  values: ["win", "loss", "draw"],
} as const satisfies SelectProperty

export type ChessOutcome = (typeof chessOutcome.values)[number]
