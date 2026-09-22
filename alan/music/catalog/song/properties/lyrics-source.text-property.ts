import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const lyricsSource = {
  id: "01a06243-144b-700a-abd4-ff8f420a1d96",
  type: "page-type/text-property",
  slug: "lyrics-source",
  propertySlug: "lyrics-source",
  definition: "the provider of a song's words",
  maxLength: 100,
  nameFormat: null,
  types: "ts",
} as const satisfies TextProperty
