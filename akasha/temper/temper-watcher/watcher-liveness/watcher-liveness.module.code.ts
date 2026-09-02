import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs"
import { dirname, join } from "node:path"
import { ran } from "@akasha/utils-run/running"
import { z } from "zod"
import { ROLLED_LOG, WORKER_LOG } from "../watcher-daemon/watcher-daemon.module.code.ts"
import { parseWatcherLine } from "../watcher-log-line/watcher-log-line.module.code.ts"
import { watcherLogDir } from "../watcher-paths/watcher-paths.module.code.ts"
import { isUnitActive, WATCHER_UNIT } from "../watcher-unit/watcher-unit.module.code.ts"

export const HEALTHY_HEARTBEAT = "Realtime health: SUBSCRIBED (healthy)"

export const FATAL_OPENING = "FATAL "

export const STALENESS_MS = 600_000

export const COOLDOWN_MS = 60 * 60_000

export const PAGE_TIMEOUT_MS = 60_000

export const PAGED_FILE = "liveness-state.json"

export const PAGE_TO = "ember"

export const PAGE_FALLBACK = "dalla"

export const PAGE_FROM = "athena"

export type LivenessReason = "ok" | "down" | "stalled"

export type LivenessVerdict = {
  readonly healthy: boolean
  readonly reason: LivenessReason
}

export function judgeLiveness(given: {
  readonly lastHealthyAgeMs: number | null
  readonly unitActive: boolean
  readonly stalenessMs: number
}): LivenessVerdict {
  const fresh = given.lastHealthyAgeMs !== null && given.lastHealthyAgeMs < given.stalenessMs
  if (fresh) return { healthy: true, reason: "ok" }
  return { healthy: false, reason: given.unitActive ? "stalled" : "down" }
}

export type PagingVerdict = {
  readonly page: boolean
  readonly nextPagedAtMs: number | null
}

export function judgeLivenessPaging(given: {
  readonly healthy: boolean
  readonly priorPagedAtMs: number | null
  readonly nowMs: number
  readonly cooldownMs: number
}): PagingVerdict {
  if (given.healthy) return { page: false, nextPagedAtMs: null }
  if (given.priorPagedAtMs === null) return { page: true, nextPagedAtMs: given.nowMs }
  if (given.nowMs - given.priorPagedAtMs >= given.cooldownMs) {
    return { page: true, nextPagedAtMs: given.nowMs }
  }
  return { page: false, nextPagedAtMs: given.priorPagedAtMs }
}

export function judgeCrashPaging(given: {
  readonly latestFatalMs: number | null
  readonly priorPagedAtMs: number | null
  readonly cooldownMs: number
}): PagingVerdict {
  const prior = given.priorPagedAtMs
  if (given.latestFatalMs === null) return { page: false, nextPagedAtMs: prior }
  if (prior === null) return { page: true, nextPagedAtMs: given.latestFatalMs }
  if (given.latestFatalMs <= prior) return { page: false, nextPagedAtMs: prior }
  if (given.latestFatalMs - prior >= given.cooldownMs) {
    return { page: true, nextPagedAtMs: given.latestFatalMs }
  }
  return { page: false, nextPagedAtMs: prior }
}

export type LogScan = {
  readonly lastHealthyMs: number | null
  readonly lastFatalMs: number | null
}

export function scanLogText(text: string, found: LogScan): LogScan {
  let lastHealthyMs = found.lastHealthyMs
  let lastFatalMs = found.lastFatalMs
  for (const raw of text.split("\n")) {
    const read = parseWatcherLine(raw, "watcher")
    if (read === null) continue
    const healthy = read.line === HEALTHY_HEARTBEAT
    const fatal = read.line.startsWith(FATAL_OPENING)
    if (!healthy && !fatal) continue
    const ms = Date.parse(read.timestamp)
    if (!Number.isFinite(ms)) continue
    if (healthy && (lastHealthyMs === null || ms > lastHealthyMs)) lastHealthyMs = ms
    if (fatal && (lastFatalMs === null || ms > lastFatalMs)) lastFatalMs = ms
  }
  return { lastHealthyMs, lastFatalMs }
}

export function scanLogs(logDir: string): LogScan {
  let found: LogScan = { lastHealthyMs: null, lastFatalMs: null }
  for (const name of [WORKER_LOG, ROLLED_LOG]) {
    const path = join(logDir, name)
    if (!existsSync(path)) continue
    let text: string
    try {
      text = readFileSync(path, "utf8")
    } catch {
      continue
    }
    found = scanLogText(text, found)
  }
  return found
}

export type PagedState = {
  readonly pagedAtMs: number | null
  readonly fatalPagedAtMs: number | null
}

const PAGED_SHAPE = z
  .object({
    pagedAtMs: z.number().nullable().optional(),
    fatalPagedAtMs: z.number().nullable().optional(),
  })
  .strict()

export function readPagedState(path: string): PagedState {
  if (!existsSync(path)) return { pagedAtMs: null, fatalPagedAtMs: null }
  try {
    const read = PAGED_SHAPE.parse(JSON.parse(readFileSync(path, "utf8")))
    return { pagedAtMs: read.pagedAtMs ?? null, fatalPagedAtMs: read.fatalPagedAtMs ?? null }
  } catch {
    return { pagedAtMs: null, fatalPagedAtMs: null }
  }
}

export function writePagedState(path: string, state: PagedState): undefined {
  try {
    mkdirSync(dirname(path), { recursive: true })
    writeFileSync(path, `${JSON.stringify(state)}\n`)
  } catch {
    return undefined
  }
  return undefined
}

export function pageTheLead(content: string): undefined {
  const first = ran(["ops", "seat", "record", PAGE_TO, "--from", PAGE_FROM, "--content", content], {
    timeout: PAGE_TIMEOUT_MS,
  })
  if (first.code !== 0) {
    process.stderr.write(
      `paging ${PAGE_TO} ended ${first.code}, so ${PAGE_FALLBACK} is paged in their place\n`
    )
    ran(["ops", "seat", "record", PAGE_FALLBACK, "--from", PAGE_FROM, "--content", content], {
      timeout: PAGE_TIMEOUT_MS,
    })
  }
  return undefined
}

export function stalledWords(
  reason: LivenessReason,
  ageWords: string,
  unitActive: boolean
): string {
  return (
    `temper-watcher liveness: ${reason.toUpperCase()} — the from-source watcher (${WATCHER_UNIT}) ` +
    `is carrying nothing across (last healthy realtime heartbeat ${ageWords}, systemd unit ` +
    `${unitActive ? "active" : "inactive"}). Game to web completion and task sync is halted. Fix: ` +
    `\`systemctl --user reset-failed ${WATCHER_UNIT} && systemctl --user restart ${WATCHER_UNIT}\`.`
  )
}

export function crashedWords(atMs: number, logPath: string): string {
  return (
    `temper-watcher CRASHED — the watcher logged a fatal exit at ${new Date(atMs).toISOString()} ` +
    `and was started again. This shows up as no liveness outage: the restart is sub-second and the ` +
    `healthy heartbeat resumes within seconds, so the staleness threshold never trips. Read the ` +
    `stack with \`grep -a -A20 "FATAL" ${logPath}\`.`
  )
}

export function takeLivenessTick(): string {
  const logDir = watcherLogDir()
  const pagedPath = join(logDir, PAGED_FILE)
  const nowMs = Date.now()
  const { lastHealthyMs, lastFatalMs } = scanLogs(logDir)
  const lastHealthyAgeMs = lastHealthyMs === null ? null : nowMs - lastHealthyMs
  const unitActive = isUnitActive()
  const prior = readPagedState(pagedPath)

  const verdict = judgeLiveness({ lastHealthyAgeMs, unitActive, stalenessMs: STALENESS_MS })
  const liveness = judgeLivenessPaging({
    healthy: verdict.healthy,
    priorPagedAtMs: prior.pagedAtMs,
    nowMs,
    cooldownMs: COOLDOWN_MS,
  })
  const crash = judgeCrashPaging({
    latestFatalMs: lastFatalMs,
    priorPagedAtMs: prior.fatalPagedAtMs,
    cooldownMs: COOLDOWN_MS,
  })

  const ageWords =
    lastHealthyAgeMs === null ? "never" : `${Math.round(lastHealthyAgeMs / 1000)}s ago`

  if (liveness.page) pageTheLead(stalledWords(verdict.reason, ageWords, unitActive))
  if (crash.page && lastFatalMs !== null) {
    pageTheLead(crashedWords(lastFatalMs, join(logDir, WORKER_LOG)))
  }

  writePagedState(pagedPath, {
    pagedAtMs: liveness.nextPagedAtMs,
    fatalPagedAtMs: crash.nextPagedAtMs,
  })

  return (
    `temper-watcher liveness: ${verdict.reason} (healthy=${verdict.healthy}, ` +
    `last-healthy-heartbeat=${ageWords}, unit=${unitActive ? "active" : "inactive"}, ` +
    `paged=${liveness.page}, last-fatal=` +
    `${lastFatalMs === null ? "none" : new Date(lastFatalMs).toISOString()}, ` +
    `crash-paged=${crash.page})`
  )
}

if (import.meta.main) {
  try {
    process.stdout.write(`${takeLivenessTick()}\n`)
  } catch (thrown) {
    process.stderr.write(`${thrown instanceof Error ? thrown.message : String(thrown)}\n`)
    process.exit(1)
  }
}
