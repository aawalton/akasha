import type { Alert } from "../alert.page-type.ts"

export const queryHardCeilingExceeded = {
  id: "01a06755-62fb-7bbd-8803-3570c74b3247",
  pageTypeSlug: "alert",
  slug: "query-hard-ceiling-exceeded",
  title: "Query hard ceiling exceeded",
  definition: "a query has been running for longer than any query is allowed to",
  domain: "query-performance",
  summary:
    "'Statement running {{ $value | printf \"%.0f\" }}s (queryid {{ $labels.queryid }}, role {{ $labels.role }}) exceeds the 30s ceiling'",
  description: "txt",
} as const satisfies Alert
