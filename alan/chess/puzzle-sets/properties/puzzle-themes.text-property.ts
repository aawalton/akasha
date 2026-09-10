import type { TextProperty } from "akasha/pages/text-properties/text-property.page-type.types.ts"

export type PuzzleThemes = string

export const puzzleThemes = {
  id: "01a06582-bd62-781f-a070-731c4558cdd5",
  pageTypeSlug: "text-property",
  type: "text-property",
  slug: "puzzle-themes",
  propertySlug: "themes",
  definition: "the motif a puzzle is built around",
  maxLength: 50,
  nameFormat: null,
} as const satisfies TextProperty
