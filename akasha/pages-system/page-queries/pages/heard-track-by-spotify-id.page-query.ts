import type { PageQuery } from "../page-query.page-type.ts"

export const heardTrackBySpotifyId = {
  id: "01a063f9-220b-7907-afd8-7f74681e1add",
  pageTypeSlug: "page-query",
  slug: "heard-track-by-spotify-id",
  asksOfSlug: "heard-track",
  parameters: [{ name: "spotify-track-id", type: "text" }],
  narrows: [{ key: "spotify-track-id", comparison: "is", values: ["$spotify-track-id"] }],
  keys: ["id", "first-heard-at"],
  limit: 1,
} as const satisfies PageQuery
