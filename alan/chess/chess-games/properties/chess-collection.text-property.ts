import type { TextProperty } from "@akasha/pages-system/text-property"

export type ChessCollection = string

export const chessCollection = {
  id: "01a06582-bd62-7684-a6cb-b0074eea56fd",
  pageTypeSlug: "text-property",
  slug: "chess-collection",
  propertySlug: "collection",
  definition: "the set of games a game belongs to",
  max: 100,
  nameFormatSlug: "name-format/lower-kebab-case",
} as const satisfies TextProperty
