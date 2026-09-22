import type { UrlProperty } from "akasha/page/url-property/url-property.page-type.types.ts"

export const gameUrl = {
  id: "01a06582-bd62-7bf6-92f5-ed7736a420f5",
  type: "page-type/url-property",
  slug: "game-url",
  propertySlug: "game-url",
  definition: "the game from which a puzzle was taken",
  maxLength: 200,
  types: "ts",
} as const satisfies UrlProperty
