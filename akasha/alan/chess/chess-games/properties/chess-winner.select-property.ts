import type { SelectProperty } from "@akasha/pages-system/select-property"

export const chessWinner = {
  id: "01a06582-bd62-73ce-a80f-1a8b7b4ca5ca",
  pageTypeSlug: "select-property",
  slug: "chess-winner",
  propertySlug: "winner",
  definition: "which side won a game",
  values: ["white", "black", "draw"],
} as const satisfies SelectProperty

export type ChessWinner = (typeof chessWinner.values)[number]
