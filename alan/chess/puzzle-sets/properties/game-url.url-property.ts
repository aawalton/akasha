import type { UrlProperty } from "@akasha/pages/url-property"

export type GameUrl = string

export const gameUrl = {
  id: "01a06582-bd62-7bf6-92f5-ed7736a420f5",
  pageTypeSlug: "url-property",
  type: "url-property",
  slug: "game-url",
  propertySlug: "game-url",
  definition: "the game a puzzle was taken from",
  maxLength: 200,
} as const satisfies UrlProperty
