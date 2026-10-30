import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const isbn13 = {
  id: "01a06741-dd0f-7001-a6f5-c643117c74b6",
  type: "page-type/text-property",
  slug: "isbn13",
  propertySlug: "isbn13",
  definition: "the current catalogue number of an edition",
  maxLength: 13,
  nameFormat: null,
  types: "ts",
  createdAt: "2026-09-03T12:32:44.815Z",
  updatedAt: "2026-10-30T15:21:09.991Z",
} as const satisfies TextProperty
