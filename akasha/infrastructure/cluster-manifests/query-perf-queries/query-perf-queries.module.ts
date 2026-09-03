import type { Module } from "@akasha/code-system/module"

export const queryPerfQueries = {
  id: "01a06810-1263-7010-b21f-ea922ce881aa",
  pageTypeSlug: "module",
  slug: "query-perf-queries",
  definition: "the queries the database exporter measures statement time with",
  code: "ts",
} as const satisfies Module
