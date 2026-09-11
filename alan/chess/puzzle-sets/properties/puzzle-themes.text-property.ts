import type { TextProperty } from "akasha/pages/text-properties/text-property.page-type.types.ts"

export const puzzleThemes = {
  id: "01a06582-bd62-781f-a070-731c4558cdd5",
  type: "text-property",
  slug: "puzzle-themes",
  propertySlug: "themes",
  definition: "the motif a puzzle is built around",
  maxLength: 50,
  nameFormat: null,
  types: "ts",
} as const satisfies TextProperty
