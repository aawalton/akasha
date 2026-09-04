import type { PageQuery } from "../page-query.page-type.ts"

export const songListenByPlayKey = {
  id: "01a063f9-220c-75f9-a296-8e0e544756ba",
  pageTypeSlug: "page-query",
  slug: "song-listen-by-play-key",
  asksOfSlug: "song-listen",
  parameters: [{ name: "play-key", type: "text" }],
  narrows: [{ key: "play-key", comparison: "is", values: ["$play-key"] }],
  keys: ["id", "played-at"],
  limit: 1,
} as const satisfies PageQuery
