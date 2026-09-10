import type { PageType } from "akasha/pages/types/page-type.page-type.types.ts"

export const syncRun = {
  id: "01a06835-e289-706f-b82b-cc895c8f24bf",
  pageTypeSlug: "page-type",
  type: "page-type",
  slug: "sync-run",
  definition: "one pull from one outside place",
  pluralSlug: "sync-runs",
  parts: [
    "instant-property/run-completed-at",
    "instant-property/run-started-at",
    "number-property/created-count",
    "number-property/duration-ms",
    "number-property/failed-count",
    "number-property/run-seq",
    "number-property/skipped-count",
    "number-property/updated-count",
    "select-property/run-status",
    "text-property/run-error-message",
  ],
  extends: ["page-type/page"],
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
      statement:
        "A run sits beside the sync that run was a pull of rather than in a file of its own.",
    },
    {
      invariantKind: "departure",
      statement: "A run reporting no counts failed before reaching anything to count.",
    },
    {
      invariantKind: "departure",
      statement: "The runs beside a sync are that sync's entries rather than pages of their own.",
    },
  ],
  types: "ts",
} as const satisfies PageType
