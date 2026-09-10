import type { NumberProperty } from "akasha/pages/number-properties/number-property.page-type.types.ts"

export type PuzzleRating = number

export const puzzleRating = {
  id: "01a06582-bd62-759e-9bb3-b90ae3c064a4",
  pageTypeSlug: "number-property",
  type: "number-property",
  slug: "puzzle-rating",
  propertySlug: "rating",
  definition: "how hard a puzzle is",
  max: null,
} as const satisfies NumberProperty
