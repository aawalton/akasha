import type { PageQuery } from "../page-query.page-type.ts"

export const relationPropertyDefinitions = {
  id: "01a063f9-220c-7ebf-ad3d-3f1a708d2e00",
  pageTypeSlug: "page-query",
  slug: "relation-property-definitions",
  asksOfSlug: "page-property",
  narrows: [{ key: "pageTypeSlug", comparison: "is", values: ["relation-property"] }],
  keys: ["slug", "propertySlug"],
} as const satisfies PageQuery
