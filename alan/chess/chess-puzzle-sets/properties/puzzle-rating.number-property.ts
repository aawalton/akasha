import type { NumberProperty } from "@akasha/pages-system/number-property"

export type PuzzleRating = number

export const puzzleRating = {
  id: "01a06582-bd62-759e-9bb3-b90ae3c064a4",
  pageTypeSlug: "number-property",
  slug: "puzzle-rating",
  propertySlug: "rating",
  definition: "how hard a puzzle is",
  max: null,
} as const satisfies NumberProperty
