import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const chessCollection = {
  id: "01a06582-bd62-7684-a6cb-b0074eea56fd",
  type: "page-type/text-property",
  slug: "chess-collection",
  propertySlug: "collection",
  definition: "the set of games a game belongs to",
  maxLength: 100,
  nameFormat: "name-format/lower-kebab-case",
  types: "ts",
  createdAt: "2026-09-03T04:24:22.114Z",
  updatedAt: "2026-09-15T16:24:02.000Z",
} as const satisfies TextProperty
