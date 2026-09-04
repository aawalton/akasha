import type { SelectProperty } from "@akasha/pages-system/select-property"

export const chessResult = {
  id: "01a06582-bd62-7289-adc0-966f26ef44b4",
  pageTypeSlug: "select-property",
  slug: "chess-result",
  propertySlug: "result",
  definition: "the score a game finished on",
  values: ["1-0", "0-1", "1/2-1/2", "*"],
} as const satisfies SelectProperty

export type ChessResult = (typeof chessResult.values)[number]
