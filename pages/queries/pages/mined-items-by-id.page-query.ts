import type { PageQuery } from "../page-query.page-type.ts"

export const minedItemsById = {
  id: "01a063f9-220b-7445-aa31-9b650859b65b",
  pageTypeSlug: "page-query",
  slug: "mined-items-by-id",
  asksOfSlug: "temper-mined-item",
  parameters: [{ name: "ids", type: "list(text)" }],
  narrows: [{ key: "slug", comparison: "in", values: ["$ids"] }],
  limit: 50,
} as const satisfies PageQuery
