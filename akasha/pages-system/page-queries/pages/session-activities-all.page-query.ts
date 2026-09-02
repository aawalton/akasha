import type { PageQuery } from "../page-query.page-type.ts"

export const sessionActivitiesAll = {
  id: "01a063f9-220c-735e-8d90-a0f37dc72de5",
  pageTypeSlug: "page-query",
  slug: "session-activities-all",
  asksOfSlug: "session-activity",
  keys: ["title", "default-difficulty"],
  sortBy: "title",
} as const satisfies PageQuery
