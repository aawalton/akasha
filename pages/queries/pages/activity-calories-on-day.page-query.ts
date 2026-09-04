import type { PageQuery } from "../page-query.page-type.ts"

export const activityCaloriesOnDay = {
  id: "01a063f9-220d-70cb-88de-b2365ec2e308",
  pageTypeSlug: "page-query",
  slug: "activity-calories-on-day",
  asksOfSlug: "wake-day",
  parameters: [{ name: "date", type: "calendar-date" }],
  narrows: [{ key: "date", comparison: "is", values: ["$date"] }],
  reduction: "sum",
  targetKey: "activity-calories",
} as const satisfies PageQuery
