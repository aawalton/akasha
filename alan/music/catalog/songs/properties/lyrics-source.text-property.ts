import type { TextProperty } from "@akasha/pages/text-property"

export type LyricsSource = string

export const lyricsSource = {
  id: "01a06243-144b-700a-abd4-ff8f420a1d96",
  pageTypeSlug: "text-property",
  type: "text-property",
  slug: "lyrics-source",
  propertySlug: "lyrics-source",
  definition: "the provider the words of a song were fetched from",
  maxLength: 100,
  nameFormat: null,
} as const satisfies TextProperty
