import type { PageQuery } from "../page-query.page-type.ts"

export const sessionSpendOnDay = {
  id: "01a063f9-220c-7183-833b-cb8f351a0d72",
  pageTypeSlug: "page-query",
  slug: "session-spend-on-day",
  asksOfSlug: "session-tracking",
  parameters: [{ name: "date", type: "tracking-day" }],
  narrows: [{ key: "daily-tracking-slug", comparison: "is", values: ["$date"] }],
  reduction: "sum",
  targetKey: "spend-hours",
} as const satisfies PageQuery
