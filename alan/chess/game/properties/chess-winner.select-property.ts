import type { SelectProperty } from "akasha/page/select-property/select-property.page-type.types.ts"

export const chessWinner = {
  id: "01a06582-bd62-73ce-a80f-1a8b7b4ca5ca",
  type: "page-type/select-property",
  slug: "chess-winner",
  propertySlug: "winner",
  definition: "which side won a game",
  values: ["white", "black", "draw"],
  types: "ts",
} as const satisfies SelectProperty
