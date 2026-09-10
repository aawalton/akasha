import type { SelectProperty } from "../../../../../pages/select-properties/select-property.page-type.types.ts"

export type SongType = "original" | "derivative"

export const songType = {
  id: "01a06243-144b-7007-a86b-aaf8bdbc945b",
  pageTypeSlug: "select-property",
  type: "select-property",
  slug: "song-type",
  propertySlug: "song-type",
  definition: "whether a song is the artist's own composition or a reading of someone else's",
  values: ["original", "derivative"],
} as const satisfies SelectProperty
