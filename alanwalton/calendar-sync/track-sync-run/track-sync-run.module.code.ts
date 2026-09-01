import type { SyncResult } from "../sync-result/sync-result.module.code.ts"

// NOTHING HERE EVER RECORDED A RUN, AND NOTHING NOTICED. This opened a `sync-run` row with
// `writeRow`, marked the `sync` page running with `patchPage`, and settled both with `patchRow`
// and `patchPage` at the end. A row stands inside a page's body rather than at a path of its own,
// and the store writes a path and a whole body rather than the keys a page carries, so all four
// have refused since 4c1f05a264.
//
// None of the four return values was ever read. `await writeRow(...)` stood as a statement, so
// each refusal was discarded where it was made and the run reported success it had not recorded.
// That is the part worth fixing: a tracker that cannot track should not look like one that does.
//
// So this runs the function it wraps and says once, plainly, that the run went unrecorded.
// Recording again means landing the `sync-run` page's whole body with `writeFiles` or
// `patchFiles`, or going through the akasha command line.
const NOT_TRACKED =
  "a `sync-run` row stands inside a page's body rather than at a path of its own, and the store writes a path and a whole body, so no run has been recorded here since the page engine was severed. land the body with `writeFiles` or `patchFiles`, or record it through the akasha command line"

export async function trackSyncRun(
  source: string,
  syncFn: () => Promise<SyncResult>
): Promise<SyncResult> {
  console.warn(`${source}: this run is not being tracked — ${NOT_TRACKED}`)
  return syncFn()
}
