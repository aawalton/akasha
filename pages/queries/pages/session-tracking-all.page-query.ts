import type { PageQuery } from "../page-query.page-type.ts"

export const sessionTrackingAll = {
  id: "01a063f9-220c-7b1e-9f88-20a5d801d194",
  pageTypeSlug: "page-query",
  slug: "session-tracking-all",
  asksOfSlug: "session-tracking",
  keys: [
    "title",
    "start-time",
    "end-time",
    "daily-tracking",
    "daily-tracking-slug",
    "safety-level",
    "difficulty-level",
    "capacity-rate",
    "relationships",
    "breathing-sets",
    "asserted-at",
    "version",
  ],
  sortBy: "start-time",
} as const satisfies PageQuery
