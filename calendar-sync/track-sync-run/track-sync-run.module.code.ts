import type { SyncResult } from "../sync-result/sync-result.module.code.ts"

const NOT_TRACKED =
  "a `sync-run` row is inside a page's body rather than at a path of its own, and the store writes a path and a whole body, so no run has been recorded here since the page engine was severed. land the body with `writeFiles` or `patchFiles`, or record it through the akasha command line"

export async function trackSyncRun(
  source: string,
  syncFn: () => Promise<SyncResult>
): Promise<SyncResult> {
  console.warn(`${source}: this run is not being tracked — ${NOT_TRACKED}`)
  return syncFn()
}
