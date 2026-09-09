import type { PageQuery } from "../page-query.page-type.ts"

export const dayLowestEmailInboxCountToday = {
  id: "01a063f9-220d-70db-b498-9fa373bb4619",
  pageTypeSlug: "page-query",
  type: "page-query",
  slug: "day-lowest-email-inbox-count-today",
  asksOfSlug: "day",
  narrows: [{ key: "date", comparison: "is", values: ["day"] }],
  keys: ["date", "lowestEmailInboxCount"],
  limit: 1,
} as const satisfies PageQuery
