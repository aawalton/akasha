import type { PageQuery } from "../page-query.page-type.ts"

export const pipelinesUnfinished = {
  id: "01a063f9-220c-7002-9248-ca2c1e2d7215",
  pageTypeSlug: "page-query",
  slug: "pipelines-unfinished",
  asksOfSlug: "pipeline",
  narrows: [{ key: "status", comparison: "in", values: ["pending", "dispatching", "running"] }],
} as const satisfies PageQuery
