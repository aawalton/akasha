export const tool = {
  summary: "One external liveness tick over the temper watcher: page the temper lead when the sync daemon is down or crash-looping",
  repos: ["instructions"],
} as const

import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs"
import { join } from "node:path"
import { codeModule } from "../tools/lib/code-import.ts"
import {
  decideCrashAlert,
  decideLivenessAlert,
  decideWatcherLiveness,
} from "../tools/lib/temper-watcher-liveness-decide.ts"
import { parseLogLine } from "../tools/lib/temper-watcher-parse-log-line.ts"
import { isUnitActive } from "../tools/lib/temper-watcher-systemd.ts"

const ESO_PATHS = "@temper/shared-foundation-misc-eso-paths"
const ZOD = "zod"

const HEALTHY_HEARTBEAT_MESSAGE = "Realtime health: SUBSCRIBED (healthy)"

const STALENESS_THRESHOLD_MS = 600_000

const COOLDOWN_MS = 60 * 60_000

const ALERT_TIMEOUT_MS = 60_000

const FATAL_LINE_PREFIX = "FATAL "

const STATE_FILE = "liveness-state.json"

const ALERT_TO = "ember"

const ALERT_FALLBACK = "dalla"

const ALERT_FROM = "athena"

const HELP = `bun services/temper-watcher-liveness.ts — one liveness tick over the temper watcher

Reads TWO INDEPENDENT SIGNALS out of watcher.log. The freshness of the last healthy realtime
heartbeat catches a sustained stall. The newest FATAL exit line catches a crash loop, which a
sub-second restart hides from any staleness threshold — the heartbeat resumes within seconds,
so the threshold never trips and the outage is invisible to the first signal alone.

ON EITHER DOWN-EDGE IT PAGES ${ALERT_TO}, the temper domain lead, falling back to
${ALERT_FALLBACK}. It sends as ${ALERT_FROM}, because a run on a schedule holds no agent id of
its own.

DEBOUNCED, NOT REPEATED. Each signal carries its own last-paged stamp in a state file beside
the log, so a watcher that stays down is said once an hour rather than once a minute.

IT WATCHES FROM OUTSIDE THE WATCHER. Nothing inside a dead daemon can report that it died.

Usage:
  bun ~/repos/instructions/services/temper-watcher-liveness.ts

  --help  This.
`

interface EsoPaths {
  readonly watcherLogDir: () => string
}

interface ZodSchema {
  readonly nullable: () => ZodSchema
  readonly optional: () => ZodSchema
}

interface Zod {
  readonly z: {
    readonly number: () => ZodSchema
    readonly object: (shape: Record<string, ZodSchema>) => {
      readonly strict: () => {
        readonly parse: (value: unknown) => {
          readonly alertedAtMs: number | null
          readonly fatalAlertedAtMs?: number | null
        }
      }
    }
  }
}

interface ProbeState {
  readonly alertedAtMs: number | null
  readonly fatalAlertedAtMs: number | null
}

interface LogScan {
  readonly lastHealthyMs: number | null
  readonly lastFatalMs: number | null
}

async function run(cmd: readonly string[], timeoutMs: number): Promise<{ exitCode: number }> {
  const proc = Bun.spawn([...cmd], { stdout: "pipe", stderr: "pipe", stdin: "ignore" })
  let timedOut = false
  const timer = setTimeout(() => {
    timedOut = true
    proc.kill()
  }, timeoutMs)
  const exitCode = await proc.exited
  clearTimeout(timer)
  return { exitCode: timedOut ? 124 : exitCode }
}

function scanLog(logDir: string): LogScan {
  let lastHealthyMs: number | null = null
  let lastFatalMs: number | null = null
  for (const name of ["watcher.log", "watcher.1.log"]) {
    const path = join(logDir, name)
    if (!existsSync(path)) continue
    let text: string
    try {
      text = readFileSync(path, "utf8")
    } catch {
      continue
    }
    for (const raw of text.split("\n")) {
      const parsed = parseLogLine(raw, "watcher")
      if (parsed === null) continue
      const isHealthy = parsed.line === HEALTHY_HEARTBEAT_MESSAGE
      const isFatal = parsed.line.startsWith(FATAL_LINE_PREFIX)
      if (!isHealthy && !isFatal) continue
      const ms = Date.parse(parsed.timestamp)
      if (!Number.isFinite(ms)) continue
      if (isHealthy && (lastHealthyMs === null || ms > lastHealthyMs)) lastHealthyMs = ms
      if (isFatal && (lastFatalMs === null || ms > lastFatalMs)) lastFatalMs = ms
    }
  }
  return { lastHealthyMs, lastFatalMs }
}

function readPriorState(statePath: string, schema: Zod): ProbeState {
  if (!existsSync(statePath)) return { alertedAtMs: null, fatalAlertedAtMs: null }
  try {
    const stateSchema = schema.z
      .object({
        alertedAtMs: schema.z.number().nullable(),
        fatalAlertedAtMs: schema.z.number().nullable().optional(),
      })
      .strict()
    const parsed = stateSchema.parse(JSON.parse(readFileSync(statePath, "utf8")))
    return { alertedAtMs: parsed.alertedAtMs, fatalAlertedAtMs: parsed.fatalAlertedAtMs ?? null }
  } catch {
    return { alertedAtMs: null, fatalAlertedAtMs: null }
  }
}

function writeState(statePath: string, state: ProbeState): undefined {
  try {
    mkdirSync(join(statePath, ".."), { recursive: true })
    writeFileSync(statePath, `${JSON.stringify(state)}\n`)
  } catch {
    return undefined
  }
  return undefined
}

async function main(argv: readonly string[]): Promise<number> {
  if (argv.includes("--help")) {
    process.stdout.write(HELP)
    return 0
  }
  const alertTo = ALERT_TO
  const alertFallback = ALERT_FALLBACK
  const alertFrom = ALERT_FROM
  const stalenessThresholdMs = STALENESS_THRESHOLD_MS
  const cooldownMs = COOLDOWN_MS

  const [esoPaths, zodModule] = await Promise.all([
    codeModule<EsoPaths>(ESO_PATHS),
    codeModule<Zod>(ZOD),
  ])

  const logDir = esoPaths.watcherLogDir()
  const statePath = join(logDir, STATE_FILE)

  const now = Date.now()
  const { lastHealthyMs, lastFatalMs } = scanLog(logDir)
  const lastHealthyHeartbeatAgeMs = lastHealthyMs === null ? null : now - lastHealthyMs
  const unitActive = isUnitActive()
  const priorState = readPriorState(statePath, zodModule)

  const decision = decideWatcherLiveness({
    lastHealthyHeartbeatAgeMs,
    unitActive,
    stalenessThresholdMs,
  })
  const alert = decideLivenessAlert({
    healthy: decision.healthy,
    priorAlertedAtMs: priorState.alertedAtMs,
    nowMs: now,
    cooldownMs,
  })
  const crashAlert = decideCrashAlert({
    latestFatalMs: lastFatalMs,
    priorFatalAlertedAtMs: priorState.fatalAlertedAtMs,
    cooldownMs,
  })

  const ageLabel =
    lastHealthyHeartbeatAgeMs === null
      ? "never"
      : `${Math.round(lastHealthyHeartbeatAgeMs / 1000)}s ago`

  async function page(content: string): Promise<undefined> {
    const primary = await run(
      ["ops", "seat", "record", alertTo, "--from", alertFrom, "--content", content],
      ALERT_TIMEOUT_MS
    )
    if (primary.exitCode !== 0) {
      process.stderr.write(
        `[liveness-probe] primary alert to ${alertTo} failed (exit ${primary.exitCode}); falling back to ${alertFallback}\n`
      )
      await run(
        ["ops", "seat", "record", alertFallback, "--from", alertFrom, "--content", content],
        ALERT_TIMEOUT_MS
      )
    }
    return undefined
  }

  if (alert.page) {
    await page(
      `temper-watcher liveness: ${decision.reason.toUpperCase()} — the from-source watcher (temper-watcher.service) ` +
        `is not importing (last healthy realtime heartbeat ${ageLabel}, systemd unit ${unitActive ? "active" : "inactive"}). ` +
        `Game→web completion/task sync is halted. Fix: \`systemctl --user reset-failed temper-watcher.service && ` +
        `systemctl --user restart temper-watcher.service\`, then confirm \`ops temper watcher status\`.`
    )
  }

  if (crashAlert.page && lastFatalMs !== null) {
    await page(
      `temper-watcher CRASHED — the watcher logged a fatal exit at ${new Date(lastFatalMs).toISOString()} ` +
        `and was restarted. This does NOT show up as a liveness outage: the restart is sub-second and the healthy ` +
        `heartbeat resumes within seconds, so the staleness threshold never trips. Read the stack: ` +
        `\`grep -a -A20 "FATAL" ${join(logDir, "watcher.log")}\`.`
    )
  }

  writeState(statePath, {
    alertedAtMs: alert.nextAlertedAtMs,
    fatalAlertedAtMs: crashAlert.nextFatalAlertedAtMs,
  })

  process.stdout.write(
    `temper-watcher liveness: ${decision.reason} (healthy=${decision.healthy}, last-healthy-heartbeat=${ageLabel}, ` +
      `unit=${unitActive ? "active" : "inactive"}, paged=${alert.page}, ` +
      `last-fatal=${lastFatalMs === null ? "none" : new Date(lastFatalMs).toISOString()}, crash-paged=${crashAlert.page})\n`
  )
  return 0
}

if (import.meta.main) process.exit(await main(process.argv.slice(2)))
