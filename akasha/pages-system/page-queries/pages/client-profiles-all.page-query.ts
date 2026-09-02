import type { PageQuery } from "../page-query.page-type.ts"

export const clientProfilesAll = {
  id: "01a063f9-220a-7678-9b4b-ddf22b34d1f1",
  pageTypeSlug: "page-query",
  slug: "client-profiles-all",
  asksOfSlug: "client-profile",
  keys: ["title", "bodyweight"],
} as const satisfies PageQuery
