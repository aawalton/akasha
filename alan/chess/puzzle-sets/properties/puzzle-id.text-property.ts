import type { TextProperty } from "akasha/pages/text-properties/text-property.page-type.types.ts"

export const puzzleId = {
  id: "01a06582-bd62-7c2a-b4dd-6bdc9120b28a",
  type: "text-property",
  slug: "puzzle-id",
  propertySlug: "puzzle-id",
  definition: "the id Lichess gives a puzzle",
  maxLength: 20,
  nameFormat: null,
  types: "ts",
} as const satisfies TextProperty
