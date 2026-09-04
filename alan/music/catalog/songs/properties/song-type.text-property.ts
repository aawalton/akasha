import type { TextProperty } from "@akasha/pages-system/text-property"

export type SongType = "original" | "derivative"

export const songType = {
  id: "01a06243-144b-7007-a86b-aaf8bdbc945b",
  pageTypeSlug: "text-property",
  slug: "song-type",
  propertySlug: "song-type",
  definition: "whether a song is the artist's own composition or a reading of someone else's",
  max: 100,
  nameFormatSlug: "name-format/lower-kebab-case",
} as const satisfies TextProperty
