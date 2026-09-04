import type { Alert } from "../alert.page-type.ts"

export const queryPerfEvaluatorAbsent = {
  id: "01a06755-62fb-79ff-b164-b3d423227783",
  pageTypeSlug: "alert",
  slug: "query-perf-evaluator-absent",
  title: "Query perf evaluator absent",
  definition: "nothing is evaluating how long Postgres queries take",
  domain: "infrastructure",
  summary: "Query-perf evaluator heartbeat absent (pg_query_perf_evaluator_up)",
  description: "txt",
} as const satisfies Alert
