import type { TextProperty } from "@akasha/pages-system/text-property"

export type PuzzleThemes = string

export const puzzleThemes = {
  id: "01a06582-bd62-781f-a070-731c4558cdd5",
  pageTypeSlug: "text-property",
  slug: "puzzle-themes",
  propertySlug: "themes",
  definition: "the motif a puzzle is built around",
  max: 50,
  nameFormatSlug: null,
} as const satisfies TextProperty
