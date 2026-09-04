import type { PageQuery } from "../page-query.page-type.ts"

export const syncRunAll = {
  id: "01a063f9-220c-7e9b-9032-a6995882fd11",
  pageTypeSlug: "page-query",
  slug: "sync-run-all",
  asksOfSlug: "sync-run",
  keys: [
    "run-seq",
    "run-status",
    "run-started-at",
    "run-completed-at",
    "duration-ms",
    "created-count",
    "updated-count",
    "skipped-count",
    "failed-count",
    "run-error-message",
  ],
} as const satisfies PageQuery
