import type { SelectProperty } from "@akasha/pages-system/select-property"

export const chessOutcome = {
  id: "01a06582-bd62-7dba-bf3d-2305634deb70",
  pageTypeSlug: "select-property",
  slug: "chess-outcome",
  propertySlug: "outcome",
  definition: "how a game went for Alan",
  values: ["win", "loss", "draw"],
} as const satisfies SelectProperty

export type ChessOutcome = (typeof chessOutcome.values)[number]
