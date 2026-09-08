export type SyncResult = {
  written: number
  skipped: number
  failed: number
}

export function emptyResult(): SyncResult {
  return { written: 0, skipped: 0, failed: 0 }
}

export function combineResults(results: readonly SyncResult[]): SyncResult {
  return results.reduce(
    (total, r) => ({
      written: total.written + r.written,
      skipped: total.skipped + r.skipped,
      failed: total.failed + r.failed,
    }),
    emptyResult()
  )
}
