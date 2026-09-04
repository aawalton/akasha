import type { PageQuery } from "../page-query.page-type.ts"

export const locationCollectionsAll = {
  id: "01a063f9-220b-7084-9c08-20f591b87371",
  pageTypeSlug: "page-query",
  slug: "location-collections-all",
  asksOfSlug: "location-collection",
  keys: ["slug", "title", "description"],
} as const satisfies PageQuery
