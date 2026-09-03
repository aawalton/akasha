import type { TextProperty } from "@akasha/pages-system/text-property"

export type PuzzleMoves = string

export const puzzleMoves = {
  id: "01a06582-bd62-7f96-8365-c96d9f27bf7f",
  pageTypeSlug: "text-property",
  slug: "puzzle-moves",
  propertySlug: "moves",
  definition: "a puzzle's answer as moves in long algebraic",
  max: 200,
  nameFormatSlug: null,
} as const satisfies TextProperty
