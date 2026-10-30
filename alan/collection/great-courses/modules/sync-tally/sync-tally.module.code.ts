import {
  classifyError,
  logError,
} from "akasha/alan/collection/great-courses/modules/sync-outcome/sync-outcome.module.code.ts"

export interface SyncResult {
  readonly created: number
  readonly updated: number
  readonly skipped: number
  readonly failed: number
}

export function safeUpdateResult(error: Error): SyncResult {
  logError("Update operation", "unknown", error, classifyError(error))
  return { created: 0, updated: 0, skipped: 0, failed: 1 }
}

export function combineSyncResults(results: readonly SyncResult[]): SyncResult {
  return results.reduce(
    (total, result) => ({
      created: total.created + result.created,
      updated: total.updated + result.updated,
      skipped: total.skipped + result.skipped,
      failed: total.failed + result.failed,
    }),
    { created: 0, updated: 0, skipped: 0, failed: 0 }
  )
}
