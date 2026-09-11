import type { CreatedCount } from "akasha/alan/collections/sync-runs/properties/created-count.number-property.types.ts"
import type { DurationMs } from "akasha/alan/collections/sync-runs/properties/duration-ms.number-property.types.ts"
import type { FailedCount } from "akasha/alan/collections/sync-runs/properties/failed-count.number-property.types.ts"
import type { RunCompletedAt } from "akasha/alan/collections/sync-runs/properties/run-completed-at.instant-property.types.ts"
import type { RunErrorMessage } from "akasha/alan/collections/sync-runs/properties/run-error-message.text-property.ts"
import type { RunSeq } from "akasha/alan/collections/sync-runs/properties/run-seq.number-property.types.ts"
import type { RunStartedAt } from "akasha/alan/collections/sync-runs/properties/run-started-at.instant-property.types.ts"
import type { RunStatus } from "akasha/alan/collections/sync-runs/properties/run-status.select-property.types.ts"
import type { SkippedCount } from "akasha/alan/collections/sync-runs/properties/skipped-count.number-property.types.ts"
import type { UpdatedCount } from "akasha/alan/collections/sync-runs/properties/updated-count.number-property.types.ts"
import type { Page } from "akasha/pages/page.page-type.types.ts"

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
