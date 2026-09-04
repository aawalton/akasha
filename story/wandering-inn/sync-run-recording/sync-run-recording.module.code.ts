import { landedMechanically } from "@akasha/command-system/asking"
import type { FileEdit } from "@akasha/command-system/landing"
import { listedAt } from "@akasha/indexes"
import { akashaRoot } from "@akasha/pages-system/checkout-roots"
import { entriesAt } from "@akasha/pages-system/page-entries"
import { besideAt } from "@akasha/pages-system/page-file-name"
import type { Value } from "@akasha/pages-system/page-value"

const SYNC_PAGE_TYPE = "sync"
const SYNC_RUNS = "sync-runs"
const JSONL = "jsonl"
const CALLED_AS = "sync-run-tracker"

const RUNNING = "running"
const FAILED = "failed"
const SUCCESS = "success"

const STALE_AFTER_MS = 7 * 60 * 60 * 1000
const MESSAGE_CEILING = 500
const NEWLINE = "\n"
const BYTES = new TextEncoder()

export interface RunCounts {
  readonly created: number
  readonly updated: number
  readonly skipped: number
  readonly failed: number
}

type Stated = Record<string, string | number>

type Filed = {
  readonly page: string
  readonly runs: readonly Value[]
}

function said(what: string): undefined {
  console.log(`  ${what}`)
}

function filedFor(root: string, source: string): Filed | null {
  const listed = listedAt(root, SYNC_PAGE_TYPE, source)
  const page = listed.length === 1 ? listed[0]?.path : undefined
  if (page === undefined) {
    said(`${SYNC_PAGE_TYPE}/${source} names ${listed.length} pages, so no run is recorded`)
    return null
  }
  const read = entriesAt(root, page, SYNC_RUNS, JSONL)
  if ("refused" in read) {
    said(`the runs already filed went unread, so no run is recorded: ${read.refused}`)
    return null
  }
  return { page, runs: read.entries }
}

async function landed(
  root: string,
  page: string,
  runs: readonly Value[],
  message: string
): Promise<undefined> {
  const at = besideAt(page, SYNC_RUNS, JSONL)
  if (at === null) {
    said(`'${page}' is no page file, so its ${SYNC_RUNS} have no name beside it`)
    return
  }
  let text = ""
  for (const one of runs) text += `${JSON.stringify(one)}${NEWLINE}`
  const changes: readonly FileEdit[] = [{ path: at, body: BYTES.encode(text) }]
  const answer = await landedMechanically(root, CALLED_AS, changes, message)
  if (answer.code !== 0) said(`the run record did not land: ${answer.refusals.join("; ")}`)
}

function stale(one: Value, startedAtMs: number): boolean {
  if (one["runStatus"] !== RUNNING) return false
  const since = one["runStartedAt"]
  const sinceMs = typeof since === "string" ? Date.parse(since) : Number.NaN
  return Number.isNaN(sinceMs) || sinceMs < startedAtMs - STALE_AFTER_MS
}

function settledStale(runs: readonly Value[], startedAtMs: number): readonly Value[] {
  return runs.map((one) => {
    if (!stale(one, startedAtMs)) return one
    said(`an earlier run never said how it ended; recording it as failed`)
    return {
      ...one,
      runStatus: FAILED,
      runCompletedAt: new Date(startedAtMs).toISOString(),
      runErrorMessage: "stale: the process ended before it recorded completion",
    }
  })
}

function settledInto(runs: readonly Value[], startedAt: string, set: Stated): readonly Value[] {
  let found = false
  const held = runs.map((one) => {
    if (one["runStartedAt"] !== startedAt || one["runStatus"] !== RUNNING) return one
    found = true
    return { ...one, ...set }
  })
  if (found) return held
  return [...held, { runStartedAt: startedAt, ...set }]
}

function settling(source: string, startedAt: string, set: Stated): undefined {
  const root = akashaRoot()
  const filed = filedFor(root, source)
  if (filed === null) return
  landed(
    root,
    filed.page,
    settledInto(filed.runs, startedAt, set),
    `${source} settles its run as ${String(set["runStatus"])}`
  )
}

export async function recordingRun(
  source: string,
  sync: () => Promise<RunCounts>
): Promise<RunCounts> {
  const startedAtMs = Date.now()
  const startedAt = new Date(startedAtMs).toISOString()

  const root = akashaRoot()
  const filed = filedFor(root, source)
  if (filed !== null) {
    landed(
      root,
      filed.page,
      [...settledStale(filed.runs, startedAtMs), { runStartedAt: startedAt, runStatus: RUNNING }],
      `${source} opens a run`
    )
  }

  let settled = false
  const finish = (set: Stated): undefined => {
    settled = true
    settling(source, startedAt, set)
  }

  const onSignal = (signal: string, code: number): undefined => {
    if (settled) return
    settled = true
    const endedMs = Date.now()
    settling(source, startedAt, {
      runStatus: FAILED,
      runCompletedAt: new Date(endedMs).toISOString(),
      durationMs: endedMs - startedAtMs,
      runErrorMessage: `terminated by ${signal} before completion`,
    })
    process.exit(code)
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
      finish({
        runStatus: FAILED,
        runCompletedAt: new Date(endedMs).toISOString(),
        durationMs: endedMs - startedAtMs,
        runErrorMessage: String(thrown).slice(0, MESSAGE_CEILING),
      })
      throw thrown
    }

    const endedMs = Date.now()
    finish({
      runStatus: counts.failed > 0 ? FAILED : SUCCESS,
      runCompletedAt: new Date(endedMs).toISOString(),
      durationMs: endedMs - startedAtMs,
      createdCount: counts.created,
      updatedCount: counts.updated,
      skippedCount: counts.skipped,
      failedCount: counts.failed,
      ...(counts.failed > 0
        ? { runErrorMessage: `the sync filed ${counts.failed} chapter(s) as failed` }
        : {}),
    })
    return counts
  } finally {
    process.off("SIGTERM", onSigterm)
    process.off("SIGINT", onSigint)
  }
}
