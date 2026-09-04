import type { TextProperty } from "@akasha/pages-system/text-property"

export type PuzzleId = string

export const puzzleId = {
  id: "01a06582-bd62-7c2a-b4dd-6bdc9120b28a",
  pageTypeSlug: "text-property",
  slug: "puzzle-id",
  propertySlug: "puzzle-id",
  definition: "the id Lichess gives a puzzle",
  max: 20,
  nameFormatSlug: null,
} as const satisfies TextProperty
