import type { PageQuery } from "../page-query.page-type.ts"

export const reviewSessionsAll = {
  id: "01a063f9-220c-7c22-97a7-3aba95424529",
  pageTypeSlug: "page-query",
  slug: "review-sessions-all",
  asksOfSlug: "review-session",
  keys: ["persona-slug", "date"],
} as const satisfies PageQuery
