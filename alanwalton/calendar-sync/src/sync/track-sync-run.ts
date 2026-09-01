import { patchPage, patchRow, writeRow } from "@shared/pages-query"
import type { SyncResult } from "./sync-result.ts"
import { WRITER } from "./sync-source.ts"

const SYNC_RUN_SLUG = "sync-run"

const SYNC_SLUG = "sync"

export async function trackSyncRun(
  source: string,
  syncFn: () => Promise<SyncResult>
): Promise<SyncResult> {
  const startedAtMs = Date.now()
  const runId = Bun.randomUUIDv7()
  await writeRow(
    SYNC_RUN_SLUG,
    source,
    {
      id: runId,
      title: `${source} sync`,
      source,
      status: "running",
      "started-at": new Date(startedAtMs).toISOString(),
    },
    WRITER
  )
  await patchPage(
    SYNC_SLUG,
    source,
    { "running-run": runId, "running-since-at": new Date(startedAtMs).toISOString() },
    WRITER
  )

  const settle = async (set: Record<string, string | number>): Promise<void> => {
    await patchRow(SYNC_RUN_SLUG, source, { id: runId, ...set }, WRITER)
    await patchPage(SYNC_SLUG, source, { "running-run": "", "running-since-at": "" }, WRITER)
  }

  let result: SyncResult
  try {
    result = await syncFn()
  } catch (err) {
    const completedAtMs = Date.now()
    await settle({
      status: "failed",
      "completed-at": new Date(completedAtMs).toISOString(),
      "duration-ms": completedAtMs - startedAtMs,
      "error-message": String(err).slice(0, 2000),
    })
    throw err
  }

  const completedAtMs = Date.now()
  const hasFailures = result.failed > 0
  await settle({
    status: hasFailures ? "failed" : "success",
    "completed-at": new Date(completedAtMs).toISOString(),
    "duration-ms": completedAtMs - startedAtMs,
    "updated-count": result.written,
    "skipped-count": result.skipped,
    "failed-count": result.failed,
    ...(hasFailures && {
      "error-message": `sync completed with ${result.failed} item failure${result.failed === 1 ? "" : "s"}`,
    }),
  })

  return result
}
