import type { TextProperty } from "@akasha/pages-system/text-property"

export type SourceGameId = string

export const sourceGameId = {
  id: "01a06582-bd62-7860-929a-ca713a01c46e",
  pageTypeSlug: "text-property",
  slug: "source-game-id",
  propertySlug: "source-game-id",
  definition: "the id a source gives a game",
  max: 100,
  nameFormatSlug: null,
} as const satisfies TextProperty
