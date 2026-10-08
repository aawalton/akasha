import type { SelectProperty } from "akasha/page/select-property/select-property.page-type.types.ts"

export const chessWinner = {
  id: "01a06582-bd62-73ce-a80f-1a8b7b4ca5ca",
  type: "page-type/select-property",
  slug: "chess-winner",
  propertySlug: "winner",
  definition: "which side won a game",
  values: ["white", "black", "draw"],
  types: "ts",
  createdAt: "2026-09-03T04:24:22.114Z",
  updatedAt: "2026-09-15T16:59:44.000Z",
} as const satisfies SelectProperty
