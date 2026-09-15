import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const sourceGameId = {
  id: "01a06582-bd62-7860-929a-ca713a01c46e",
  type: "page-type/text-property",
  slug: "source-game-id",
  propertySlug: "source-game-id",
  definition: "the id a source gives a game",
  maxLength: 100,
  nameFormat: null,
  types: "ts",
} as const satisfies TextProperty
