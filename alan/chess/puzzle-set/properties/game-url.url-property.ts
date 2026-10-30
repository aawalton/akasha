import type { UrlProperty } from "akasha/page/url-property/url-property.page-type.types.ts"

export const gameUrl = {
  id: "01a06582-bd62-7bf6-92f5-ed7736a420f5",
  type: "page-type/url-property",
  slug: "game-url",
  propertySlug: "game-url",
  definition: "the game a puzzle was made from",
  maxLength: 200,
  types: "ts",
  createdAt: "2026-09-03T04:24:22.114Z",
  updatedAt: "2026-10-30T15:03:19.133Z",
} as const satisfies UrlProperty
