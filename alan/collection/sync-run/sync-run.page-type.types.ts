import type { CreatedCount } from "akasha/alan/collection/sync-run/properties/created-count.number-property.types.ts"
import type { DurationMs } from "akasha/alan/collection/sync-run/properties/duration-ms.number-property.types.ts"
import type { FailedCount } from "akasha/alan/collection/sync-run/properties/failed-count.number-property.types.ts"
import type { RunCompletedAt } from "akasha/alan/collection/sync-run/properties/run-completed-at.instant-property.types.ts"
import type { RunErrorMessage } from "akasha/alan/collection/sync-run/properties/run-error-message.text-property.types.ts"
import type { RunSeq } from "akasha/alan/collection/sync-run/properties/run-seq.number-property.types.ts"
import type { RunStartedAt } from "akasha/alan/collection/sync-run/properties/run-started-at.instant-property.types.ts"
import type { RunStatus } from "akasha/alan/collection/sync-run/properties/run-status.select-property.types.ts"
import type { SkippedCount } from "akasha/alan/collection/sync-run/properties/skipped-count.number-property.types.ts"
import type { UpdatedCount } from "akasha/alan/collection/sync-run/properties/updated-count.number-property.types.ts"
import type { Page } from "akasha/page/page.page-type.types.ts"

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
