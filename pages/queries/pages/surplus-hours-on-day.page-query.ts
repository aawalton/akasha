import type { PageQuery } from "../page-query.page-type.types.ts"

export const surplusHoursOnDay = {
  id: "01a063f9-220d-7853-8282-f15b83e81f77",
  pageTypeSlug: "page-query",
  type: "page-query",
  slug: "surplus-hours-on-day",
  asksOfSlug: "day",
  parameters: [{ name: "date", type: "calendar-date" }],
  narrows: [{ key: "date", comparison: "is", values: ["$date"] }],
  reduction: "sum",
  targetKey: "surplusHours",
} as const satisfies PageQuery
