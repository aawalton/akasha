import type { PageQuery } from "../page-query.page-type.ts"

export const episodesWatchedOnDay = {
  id: "01a063f9-220a-7489-8d1f-631160c8612b",
  pageTypeSlug: "page-query",
  slug: "episodes-watched-on-day",
  asksOfSlug: "episode",
  parameters: [{ name: "day", type: "calendar-date" }],
  narrows: [{ key: "completedAt", comparison: "is", values: ["$day"] }],
  reduction: "sum",
  targetKey: "length",
} as const satisfies PageQuery
