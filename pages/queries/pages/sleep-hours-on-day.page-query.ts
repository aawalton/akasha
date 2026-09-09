import type { PageQuery } from "../page-query.page-type.ts"

export const sleepHoursOnDay = {
  id: "01a063f9-220d-73a5-8501-646453f11ef4",
  pageTypeSlug: "page-query",
  type: "page-query",
  slug: "sleep-hours-on-day",
  asksOfSlug: "day",
  parameters: [{ name: "date", type: "calendar-date" }],
  narrows: [{ key: "date", comparison: "is", values: ["$date"] }],
  reduction: "sum",
  targetKey: "sleepHours",
} as const satisfies PageQuery
