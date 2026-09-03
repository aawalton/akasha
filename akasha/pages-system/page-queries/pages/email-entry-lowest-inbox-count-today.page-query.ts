import type { PageQuery } from "../page-query.page-type.ts"

export const emailEntryLowestInboxCountToday = {
  id: "01a063f9-220d-70db-b498-9fa373bb4619",
  pageTypeSlug: "page-query",
  slug: "email-entry-lowest-inbox-count-today",
  asksOfSlug: "email-entry",
  narrows: [{ key: "date", comparison: "is", values: ["wake-day"] }],
  keys: ["date", "lowestInboxCount"],
  limit: 1,
} as const satisfies PageQuery
