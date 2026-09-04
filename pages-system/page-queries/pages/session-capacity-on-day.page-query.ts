import type { PageQuery } from "../page-query.page-type.ts"

export const sessionCapacityOnDay = {
  id: "01a063f9-220d-70e2-9c81-d7ccb1e66605",
  pageTypeSlug: "page-query",
  slug: "session-capacity-on-day",
  asksOfSlug: "session-tracking",
  parameters: [{ name: "date", type: "tracking-day" }],
  narrows: [{ key: "daily-tracking-slug", comparison: "is", values: ["$date"] }],
  reduction: "sum",
  targetKey: "health-capacity-hours",
} as const satisfies PageQuery
