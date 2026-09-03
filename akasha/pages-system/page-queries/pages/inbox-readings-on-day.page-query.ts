import type { PageQuery } from "../page-query.page-type.ts"

export const inboxReadingsOnDay = {
  id: "01a063f9-220d-72fc-b11b-62012a039ce7",
  pageTypeSlug: "page-query",
  slug: "inbox-readings-on-day",
  asksOfSlug: "daily-tracking",
  parameters: [{ name: "day", type: "calendar-date" }],
  narrows: [{ key: "date", comparison: "is", values: ["$day"] }],
  keys: [
    "date",
    "inbox-tasks",
    "inbox-tasks-cleared-today",
    "inbox-temper-tasks",
    "inbox-temper-tasks-cleared-today",
  ],
  limit: 1,
} as const satisfies PageQuery
