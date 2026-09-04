import type { PageQuery } from "../page-query.page-type.ts"

export const mainPipelinesUnfinished = {
  id: "01a063f9-220b-77a4-bc7f-4ea6046e065c",
  pageTypeSlug: "page-query",
  slug: "main-pipelines-unfinished",
  asksOfSlug: "pipeline",
  narrows: [
    { key: "branch", comparison: "is", values: ["main"] },
    { key: "status", comparison: "in", values: ["pending", "dispatching", "running"] },
  ],
} as const satisfies PageQuery
