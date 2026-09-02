import type { PageQuery } from "../page-query.page-type.ts"

export const heardTrackByTitleKey = {
  id: "01a063f9-220b-799b-8689-cea5ceec3cdf",
  pageTypeSlug: "page-query",
  slug: "heard-track-by-title-key",
  asksOfSlug: "heard-track",
  parameters: [{ name: "title-key", type: "text" }],
  narrows: [{ key: "title-key", comparison: "is", values: ["$title-key"] }],
  keys: ["id", "first-heard-at"],
  limit: 1,
} as const satisfies PageQuery
