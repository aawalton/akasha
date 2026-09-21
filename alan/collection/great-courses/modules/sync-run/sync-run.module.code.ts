import type { SyncResult } from "akasha/alan/collection/great-courses/modules/sync-outcome/sync-outcome.module.code.ts"
import { recordingRun } from "akasha/alan/collection/modules/sync-run-recording/sync-run-recording.module.code.ts"

export async function trackSyncRun(
  source: string,
  syncFn: () => Promise<SyncResult>
): Promise<void> {
  const result = await recordingRun(source, syncFn)

  if (result.failed > 0) {
    throw new Error(
      `sync "${source}" recorded ${result.failed} item failure${result.failed === 1 ? "" : "s"}, so this exits non-zero`
    )
  }
}
