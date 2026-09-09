import type { PageQuery } from "../page-query.page-type.ts"

export const syncRunAll = {
  id: "01a063f9-220c-7e9b-9032-a6995882fd11",
  pageTypeSlug: "page-query",
  type: "page-query",
  slug: "sync-run-all",
  asksOfSlug: "sync-run",
  keys: [
    "runSeq",
    "runStatus",
    "runStartedAt",
    "runCompletedAt",
    "durationMs",
    "createdCount",
    "updatedCount",
    "skippedCount",
    "failedCount",
    "runErrorMessage",
  ],
} as const satisfies PageQuery
