import type { PageQuery } from "../page-query.page-type.ts"

export const songListenNewest = {
  id: "01a063f9-220c-7db8-9b4d-479d847e3f5c",
  pageTypeSlug: "page-query",
  slug: "song-listen-newest",
  asksOfSlug: "song-listen",
  keys: ["id", "played-at"],
  sortBy: "played-at",
  descending: true,
  limit: 1,
} as const satisfies PageQuery
