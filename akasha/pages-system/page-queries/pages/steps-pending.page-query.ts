import type { PageQuery } from "../page-query.page-type.ts"

export const stepsPending = {
  id: "01a063f9-220c-7944-b21c-c7af4e538482",
  pageTypeSlug: "page-query",
  slug: "steps-pending",
  asksOfSlug: "step",
  narrows: [{ key: "status", comparison: "in", values: ["pending"] }],
} as const satisfies PageQuery
