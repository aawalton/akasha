import type { PageQuery } from "../page-query.page-type.ts"

export const relationshipsAll = {
  id: "01a063f9-220c-7b2f-a8ed-7b2074daf34e",
  pageTypeSlug: "page-query",
  slug: "relationships-all",
  asksOfSlug: "relationship",
  keys: [
    "title",
    "relationship-current-circle",
    "relationship-commitment",
    "relationship-connection",
    "relationship-impact",
    "relationship-interest",
    "relationship-email",
    "relationship-phone",
  ],
} as const satisfies PageQuery
