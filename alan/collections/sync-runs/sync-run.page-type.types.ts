import type { Page } from "../../../pages/page.page-type.types.ts"
import type { CreatedCount } from "./properties/created-count.number-property.types.ts"
import type { DurationMs } from "./properties/duration-ms.number-property.types.ts"
import type { FailedCount } from "./properties/failed-count.number-property.types.ts"
import type { RunCompletedAt } from "./properties/run-completed-at.instant-property.types.ts"
import type { RunErrorMessage } from "./properties/run-error-message.text-property.ts"
import type { RunSeq } from "./properties/run-seq.number-property.types.ts"
import type { RunStartedAt } from "./properties/run-started-at.instant-property.types.ts"
import type { RunStatus } from "./properties/run-status.select-property.types.ts"
import type { SkippedCount } from "./properties/skipped-count.number-property.types.ts"
import type { UpdatedCount } from "./properties/updated-count.number-property.types.ts"

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
