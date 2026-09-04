import type { PageQuery } from "../page-query.page-type.ts"

export const alertsAll = {
  id: "01a063f9-2209-7b79-afe3-7470b7df379f",
  pageTypeSlug: "page-query",
  slug: "alerts-all",
  asksOfSlug: "alert",
  keys: ["slug", "summary", "description"],
} as const satisfies PageQuery
