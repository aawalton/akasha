import type { PageQuery } from "../page-query.page-type.ts"

export const inboxReadingsOnDay = {
  id: "01a063f9-220d-72fc-b11b-62012a039ce7",
  pageTypeSlug: "page-query",
  slug: "inbox-readings-on-day",
  asksOfSlug: "wake-day",
  parameters: [{ name: "day", type: "calendar-date" }],
  narrows: [{ key: "date", comparison: "is", values: ["$day"] }],
  keys: [
    "date",
    "inboxTasks",
    "inboxTasksClearedToday",
    "inboxTemperTasks",
    "inboxTemperTasksClearedToday",
  ],
  limit: 1,
} as const satisfies PageQuery
