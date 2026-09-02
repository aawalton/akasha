import type { PageQuery } from "../page-query.page-type.ts"

export const safetyLevelOnDay = {
  id: "01a063f9-220d-7c59-a466-aa7f71c27808",
  pageTypeSlug: "page-query",
  slug: "safety-level-on-day",
  asksOfSlug: "session-tracking",
  parameters: [{ name: "date", type: "tracking-day" }],
  narrows: [
    { key: "daily-tracking-slug", comparison: "is", values: ["$date"] },
    { key: "safety-level", comparison: "empty", values: ["false"] },
  ],
  keys: ["daily-tracking-slug", "start-time", "safety-level"],
  sortBy: "start-time",
  descending: true,
  limit: 1,
} as const satisfies PageQuery
