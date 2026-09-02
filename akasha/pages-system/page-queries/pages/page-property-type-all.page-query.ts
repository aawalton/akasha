import type { PageQuery } from "../page-query.page-type.ts"

export const pagePropertyTypeAll = {
  id: "01a063f9-220b-7d55-94f2-5d508af56410",
  pageTypeSlug: "page-query",
  slug: "page-property-type-all",
  asksOfSlug: "page-property-type",
  keys: ["type-slug", "kind", "suffix", "of", "value"],
} as const satisfies PageQuery
