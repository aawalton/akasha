import type { Page } from "@akasha/pages/page"
import type { PageType } from "@akasha/pages/page-type"
import type { CreatedCount } from "./properties/created-count.number-property.ts"
import type { DurationMs } from "./properties/duration-ms.number-property.ts"
import type { FailedCount } from "./properties/failed-count.number-property.ts"
import type { RunCompletedAt } from "./properties/run-completed-at.instant-property.ts"
import type { RunErrorMessage } from "./properties/run-error-message.text-property.ts"
import type { RunSeq } from "./properties/run-seq.number-property.ts"
import type { RunStartedAt } from "./properties/run-started-at.instant-property.ts"
import type { RunStatus } from "./properties/run-status.select-property.ts"
import type { SkippedCount } from "./properties/skipped-count.number-property.ts"
import type { UpdatedCount } from "./properties/updated-count.number-property.ts"

export type SyncRun = Page & {
  runSeq?: RunSeq
  runStartedAt: RunStartedAt
  runCompletedAt?: RunCompletedAt
  durationMs?: DurationMs
  runStatus: RunStatus
  createdCount?: CreatedCount
  updatedCount?: UpdatedCount
  skippedCount?: SkippedCount
  failedCount?: FailedCount
  runErrorMessage?: RunErrorMessage
}

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
} as const satisfies PageType
