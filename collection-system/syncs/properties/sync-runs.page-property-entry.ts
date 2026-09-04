import type { PagePropertyEntry } from "@akasha/pages-system/page-property-entry"

export type SyncRuns = "jsonl"

export const syncRuns = {
  id: "01a06861-f664-70f9-9c72-89cac17bf56b",
  pageTypeSlug: "page-property-entry",
  slug: "sync-runs",
  propertySlug: "sync-runs",
  definition: "every pull a sync has made, one to a line",
  properties: [
    { pagePropertySlug: "run-seq", required: false, many: false },
    { pagePropertySlug: "run-started-at", required: true, many: false },
    { pagePropertySlug: "run-completed-at", required: false, many: false },
    { pagePropertySlug: "duration-ms", required: false, many: false },
    { pagePropertySlug: "run-status", required: true, many: false },
    { pagePropertySlug: "created-count", required: false, many: false },
    { pagePropertySlug: "updated-count", required: false, many: false },
    { pagePropertySlug: "skipped-count", required: false, many: false },
    { pagePropertySlug: "failed-count", required: false, many: false },
    { pagePropertySlug: "run-error-message", required: false, many: false },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A run names no source: the run stands beside the sync the run was a pull of.",
    },
    {
      invariantKind: "departure",
      statement: "A run reporting no counts failed before reaching anything to count.",
    },
  ],
} as const satisfies PagePropertyEntry
