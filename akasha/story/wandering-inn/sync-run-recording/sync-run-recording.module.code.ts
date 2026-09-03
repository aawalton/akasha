import { askComposed, patchPage, rowLanding } from "@tools/lib/page-query-client"

const SYNC_PAGE_TYPE = "sync"
const RUN_PAGE_TYPE = "sync-run"
const WRITER = "sync-run-tracker"

const STALE_AFTER_MS = 7 * 60 * 60 * 1000
const MESSAGE_CEILING = 2000

export interface RunCounts {
  readonly created: number
  readonly updated: number
  readonly skipped: number
  readonly failed: number
}

type Stated = Record<string, string | number>

function unreached(thrown: unknown): { readonly ok: false; readonly why: string } {
  return { ok: false, why: String(thrown) }
}

async function stateRun(
  source: string,
  values: Stated,
  act: "write-row" | "patch-row"
): Promise<void> {
  const landed = await rowLanding(act, RUN_PAGE_TYPE, source, values, WRITER).catch(unreached)
  if (!landed.ok) console.log(`  the run record did not land: ${landed.why}`)
}

async function stateSync(source: string, values: Stated): Promise<void> {
  const landed = await patchPage(SYNC_PAGE_TYPE, source, values, WRITER).catch(unreached)
  if (!landed.ok) console.log(`  the sync page did not take the run: ${landed.why}`)
}

async function failStaleRun(source: string, startedAtMs: number): Promise<void> {
  const asked = await askComposed({
    "page-type": SYNC_PAGE_TYPE,
    where: { slug: { is: source } },
    keys: ["running-run", "running-since-at"],
  })
  if (!asked.ok || asked.rows.length !== 1) return
  const values = asked.rows[0]?.values ?? {}
  const held = values["running-run"]
  if (typeof held !== "string" || held === "") return
  const since = values["running-since-at"]
  const sinceMs = typeof since === "string" ? Date.parse(since) : Number.NaN
  if (!Number.isNaN(sinceMs) && sinceMs >= startedAtMs - STALE_AFTER_MS) return
  console.log(`  an earlier run (${held}) never said how it ended; recording it as failed`)
  await stateRun(
    source,
    {
      id: held,
      status: "failed",
      "completed-at": new Date(startedAtMs).toISOString(),
      "error-message": "stale: the process ended before it recorded completion",
    },
    "patch-row"
  )
}

export async function recordingRun(
  source: string,
  sync: () => Promise<RunCounts>
): Promise<RunCounts> {
  const startedAtMs = Date.now()
  const startedAt = new Date(startedAtMs).toISOString()

  await failStaleRun(source, startedAtMs).catch((thrown) => {
    console.log(`  whether an earlier run is still open went unread: ${String(thrown)}`)
  })

  const runId = Bun.randomUUIDv7()
  await stateRun(
    source,
    { id: runId, source, status: "running", "started-at": startedAt },
    "write-row"
  )
  await stateSync(source, { "running-run": runId, "running-since-at": startedAt })

  let settled = false
  const finish = async (set: Stated): Promise<void> => {
    settled = true
    await stateRun(source, { id: runId, ...set }, "patch-row")
    await stateSync(source, { "running-run": "", "running-since-at": "" })
  }

  const onSignal = (signal: string, code: number): undefined => {
    if (settled) return
    settled = true
    const endedMs = Date.now()
    void stateRun(
      source,
      {
        id: runId,
        status: "failed",
        "completed-at": new Date(endedMs).toISOString(),
        "duration-ms": endedMs - startedAtMs,
        "error-message": `terminated by ${signal} before completion`,
      },
      "patch-row"
    ).finally(() => process.exit(code))
  }
  const onSigterm = (): undefined => onSignal("SIGTERM", 143)
  const onSigint = (): undefined => onSignal("SIGINT", 130)
  process.once("SIGTERM", onSigterm)
  process.once("SIGINT", onSigint)

  try {
    let counts: RunCounts
    try {
      counts = await sync()
    } catch (thrown) {
      const endedMs = Date.now()
      await finish({
        status: "failed",
        "completed-at": new Date(endedMs).toISOString(),
        "duration-ms": endedMs - startedAtMs,
        "error-message": String(thrown).slice(0, MESSAGE_CEILING),
      })
      throw thrown
    }

    const endedMs = Date.now()
    await finish({
      status: counts.failed > 0 ? "failed" : "success",
      "completed-at": new Date(endedMs).toISOString(),
      "duration-ms": endedMs - startedAtMs,
      "created-count": counts.created,
      "updated-count": counts.updated,
      "skipped-count": counts.skipped,
      "failed-count": counts.failed,
      ...(counts.failed > 0
        ? { "error-message": `the sync filed ${counts.failed} chapter(s) as failed` }
        : {}),
    })
    return counts
  } finally {
    process.off("SIGTERM", onSigterm)
    process.off("SIGINT", onSigint)
  }
}
