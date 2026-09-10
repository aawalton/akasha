import type { PagePropertyEntry } from "akasha/pages/property-entries/page-property-entry.page-type.types.ts"

export type SyncRuns = "jsonl"

export const syncRuns = {
  id: "01a06861-f664-70f9-9c72-89cac17bf56b",
  pageTypeSlug: "page-property-entry",
  type: "page-property-entry",
  slug: "sync-runs",
  propertySlug: "sync-runs",
  definition: "every pull a sync has made, one to a line",
  properties: [
    { pageProperty: "number-property/run-seq", required: false, many: false },
    { pageProperty: "instant-property/run-started-at", required: true, many: false },
    { pageProperty: "instant-property/run-completed-at", required: false, many: false },
    { pageProperty: "number-property/duration-ms", required: false, many: false },
    { pageProperty: "select-property/run-status", required: true, many: false },
    { pageProperty: "number-property/created-count", required: false, many: false },
    { pageProperty: "number-property/updated-count", required: false, many: false },
    { pageProperty: "number-property/skipped-count", required: false, many: false },
    { pageProperty: "number-property/failed-count", required: false, many: false },
    { pageProperty: "text-property/run-error-message", required: false, many: false },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A run names no source.",
    },
    {
      invariantKind: "departure",
      statement: "A run sits beside the sync that run was a pull of.",
    },
    {
      invariantKind: "departure",
      statement: "A run reporting no counts failed before reaching anything to count.",
    },
  ],
} as const satisfies PagePropertyEntry
