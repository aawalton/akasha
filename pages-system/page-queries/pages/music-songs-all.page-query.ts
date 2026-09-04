import type { PageQuery } from "../page-query.page-type.ts"

export const musicSongsAll = {
  id: "01a063f9-220b-73fd-bb7b-e91d8e10e21a",
  pageTypeSlug: "page-query",
  slug: "music-songs-all",
  asksOfSlug: "song",
  keys: ["id", "slug", "title", "artist-slug", "song-type", "written", "performed", "rating"],
} as const satisfies PageQuery
