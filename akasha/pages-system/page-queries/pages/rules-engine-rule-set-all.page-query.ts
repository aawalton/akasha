import type { PageQuery } from "../page-query.page-type.ts"

export const rulesEngineRuleSetAll = {
  id: "01a063f9-220c-7844-a3fa-e7f65dd52192",
  pageTypeSlug: "page-query",
  slug: "rules-engine-rule-set-all",
  asksOfSlug: "rules-engine-rule-set",
  keys: ["slug", "extends-slug"],
} as const satisfies PageQuery
