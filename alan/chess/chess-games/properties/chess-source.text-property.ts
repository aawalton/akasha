import type { TextProperty } from "@akasha/pages-system/text-property"

export type ChessSource = string

export const chessSource = {
  id: "01a06582-bd62-7f26-81ac-a3d85df41e67",
  pageTypeSlug: "text-property",
  slug: "chess-source",
  propertySlug: "source",
  definition: "where a game came from",
  max: 100,
  nameFormatSlug: "name-format/lower-kebab-case",
} as const satisfies TextProperty
