import type { SyncResult } from "../sync-outcome/sync-outcome.module.code.ts"

const SYNC_RUN_SLUG = "sync-run"

const NO_ROW_ROAD =
  "a `sync-run` row is inside a page's body rather than at a path of its own, the store answers " +
  "for `akasha/` alone, and this record is `pages/sync/<source>.sync.runs.jsonl` outside it, so " +
  "no keyed write and no `writeFiles` reaches it. systemd holds the start, the end and the exit " +
  "status of this run; the journal holds its summary"

export async function trackSyncRun(
  source: string,
  syncFn: () => Promise<SyncResult>
): Promise<void> {
  console.warn(
    `trackSyncRun(${source}): no \`${SYNC_RUN_SLUG}\` row was opened or settled — ${NO_ROW_ROAD}`
  )

  const result = await syncFn()

  if (result.failed > 0) {
    throw new Error(
      `sync "${source}" recorded ${result.failed} item failure${result.failed === 1 ? "" : "s"}, so this exits non-zero`
    )
  }
}
