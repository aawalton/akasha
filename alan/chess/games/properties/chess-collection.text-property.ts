import type { TextProperty } from "akasha/pages/text-properties/text-property.page-type.types.ts"

export const chessCollection = {
  id: "01a06582-bd62-7684-a6cb-b0074eea56fd",
  type: "text-property",
  slug: "chess-collection",
  propertySlug: "collection",
  definition: "the set of games a game belongs to",
  maxLength: 100,
  nameFormat: "name-format/lower-kebab-case",
  types: "ts",
} as const satisfies TextProperty
