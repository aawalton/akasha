import type { PageQuery } from "../page-query.page-type.ts"

export const sleepHoursOnDay = {
  id: "01a063f9-220d-73a5-8501-646453f11ef4",
  pageTypeSlug: "page-query",
  slug: "sleep-hours-on-day",
  asksOfSlug: "wake-day",
  parameters: [{ name: "date", type: "calendar-date" }],
  narrows: [{ key: "date", comparison: "is", values: ["$date"] }],
  reduction: "sum",
  targetKey: "sleep-hours",
} as const satisfies PageQuery
