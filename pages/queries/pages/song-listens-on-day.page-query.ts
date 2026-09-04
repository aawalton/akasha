import type { PageQuery } from "../page-query.page-type.ts"

export const songListensOnDay = {
  id: "01a063f9-220c-75f3-89e4-7754769723cb",
  pageTypeSlug: "page-query",
  slug: "song-listens-on-day",
  asksOfSlug: "song-listen",
  parameters: [
    { name: "persona-slug", type: "text" },
    { name: "date", type: "calendar-date" },
  ],
  narrows: [
    { key: "persona-slug", comparison: "is", values: ["$persona-slug"] },
    { key: "date", comparison: "is", values: ["$date"] },
  ],
  reduction: "sum",
  targetKey: "new-music-minutes",
} as const satisfies PageQuery
