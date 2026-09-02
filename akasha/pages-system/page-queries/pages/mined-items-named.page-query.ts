import type { PageQuery } from "../page-query.page-type.ts"

export const minedItemsNamed = {
  id: "01a063f9-220b-7ed8-9b08-e8ef9174e34f",
  pageTypeSlug: "page-query",
  slug: "mined-items-named",
  asksOfSlug: "temper-mined-item",
  parameters: [{ name: "q", type: "text" }],
  narrows: [{ key: "name", comparison: "contains", values: ["$q"] }],
  keys: ["itemId", "name", "icon", "quality", "itemType", "filterType", "setName"],
  limit: 20,
} as const satisfies PageQuery
