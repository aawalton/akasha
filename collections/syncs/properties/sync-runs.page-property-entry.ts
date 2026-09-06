import type { PagePropertyEntry } from "@akasha/pages/page-property-entry"

export type SyncRuns = "jsonl"

export const syncRuns = {
  id: "01a06861-f664-70f9-9c72-89cac17bf56b",
  pageTypeSlug: "page-property-entry",
  slug: "sync-runs",
  propertySlug: "sync-runs",
  definition: "every pull a sync has made, one to a line",
  properties: [
    { pagePropertySlug: "number-property/run-seq", required: false, many: false },
    { pagePropertySlug: "instant-property/run-started-at", required: true, many: false },
    { pagePropertySlug: "instant-property/run-completed-at", required: false, many: false },
    { pagePropertySlug: "number-property/duration-ms", required: false, many: false },
    { pagePropertySlug: "select-property/run-status", required: true, many: false },
    { pagePropertySlug: "number-property/created-count", required: false, many: false },
    { pagePropertySlug: "number-property/updated-count", required: false, many: false },
    { pagePropertySlug: "number-property/skipped-count", required: false, many: false },
    { pagePropertySlug: "number-property/failed-count", required: false, many: false },
    { pagePropertySlug: "text-property/run-error-message", required: false, many: false },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A run names no source: the run sits beside the sync the run was a pull of.",
    },
    {
      invariantKind: "departure",
      statement: "A run reporting no counts failed before reaching anything to count.",
    },
  ],
} as const satisfies PagePropertyEntry
