import type { PageQuery } from "../page-query.page-type.types.ts"

export const personaCraftDaysAll = {
  id: "01a063f9-220c-7613-8f1a-880c8e05ce8f",
  pageTypeSlug: "page-query",
  type: "page-query",
  slug: "persona-craft-days-all",
  asksOfSlug: "persona-craft-day",
  keys: ["persona", "date", "valueSlug", "advanceCount", "newPersonaCount", "improvementCount"],
} as const satisfies PageQuery
