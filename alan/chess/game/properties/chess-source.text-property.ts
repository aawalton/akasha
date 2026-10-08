import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const chessSource = {
  id: "01a06582-bd62-7f26-81ac-a3d85df41e67",
  type: "page-type/text-property",
  slug: "chess-source",
  propertySlug: "source",
  definition: "a game's source",
  maxLength: 100,
  nameFormat: "name-format/lower-kebab-case",
  types: "ts",
  createdAt: "2026-09-03T04:24:22.114Z",
  updatedAt: "2026-09-22T13:44:11.000Z",
} as const satisfies TextProperty
