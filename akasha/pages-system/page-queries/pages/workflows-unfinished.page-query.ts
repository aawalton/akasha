import type { PageQuery } from "../page-query.page-type.ts"

export const workflowsUnfinished = {
  id: "01a063f9-220d-772d-a18c-e9dbb3fb856f",
  pageTypeSlug: "page-query",
  slug: "workflows-unfinished",
  asksOfSlug: "workflow",
  narrows: [{ key: "status", comparison: "in", values: ["pending", "dispatching", "running"] }],
} as const satisfies PageQuery
