import type { PageQuery } from "../page-query.page-type.ts"

export const pagePropertyDefinitionAll = {
  id: "01a063f9-220b-7671-ab6b-15bc2841caf3",
  pageTypeSlug: "page-query",
  slug: "page-property-definition-all",
  asksOfSlug: "page-property",
  keys: ["slug", "key", "defined-on-slug", "type"],
} as const satisfies PageQuery
