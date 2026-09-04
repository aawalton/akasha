import type { PageQuery } from "../page-query.page-type.ts"

export const minedItemsRestoring = {
  id: "01a063f9-220b-7b53-977a-9eee82780a77",
  pageTypeSlug: "page-query",
  slug: "mined-items-restoring",
  asksOfSlug: "temper-mined-item",
  narrows: [
    { key: "abilityDescription", comparison: "contains", values: ["Restore ", "immediately"] },
  ],
  keys: ["itemId", "name", "title", "abilityDescription"],
  limit: 1000,
} as const satisfies PageQuery
