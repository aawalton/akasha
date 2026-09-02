export const tool = {
  summary: "One external liveness tick over the temper watcher: page the temper lead when the sync daemon is down or crash-looping",
  repos: ["akasha"],
} as const

import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs"
import { join } from "node:path"
import { watcherLogDir } from "@akasha/temper-watcher/watcher-paths"
import { z } from "zod"
import {
  decideCrashAlert,
  decideLivenessAlert,
  decideWatcherLiveness,
} from "../tools/lib/temper-watcher-liveness-decide.ts"
import { parseLogLine } from "../tools/lib/temper-watcher-parse-log-line.ts"
import { isUnitActive } from "../tools/lib/temper-watcher-systemd.ts"
import { writeMessage } from "../tools/lib/message-file.ts"

const HEALTHY_HEARTBEAT_MESSAGE = "Realtime health: SUBSCRIBED (healthy)"

const STALENESS_THRESHOLD_MS = 600_000

const COOLDOWN_MS = 60 * 60_000

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
  bun ~/repos/akasha/services/temper-watcher-liveness.ts

  --help  This.
`

interface ProbeState {
  readonly alertedAtMs: number | null
  readonly fatalAlertedAtMs: number | null
}

interface LogScan {
  readonly lastHealthyMs: number | null
  readonly lastFatalMs: number | null
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

function readPriorState(statePath: string): ProbeState {
  if (!existsSync(statePath)) return { alertedAtMs: null, fatalAlertedAtMs: null }
  try {
    const stateSchema = z
      .object({
        alertedAtMs: z.number().nullable(),
        fatalAlertedAtMs: z.number().nullable().optional(),
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

  const logDir = watcherLogDir()
  const statePath = join(logDir, STATE_FILE)

  const now = Date.now()
  const { lastHealthyMs, lastFatalMs } = scanLog(logDir)
  const lastHealthyHeartbeatAgeMs = lastHealthyMs === null ? null : now - lastHealthyMs
  const unitActive = isUnitActive()
  const priorState = readPriorState(statePath)

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

  // BOTH RUNGS OF THIS LADDER WERE THE SAME MISSING COMMAND. The primary paged `ops seat record
  // ember` and the fallback paged `ops seat record dalla`, and there is no `ops seat record` —
  // `ops seat` carries boot, fleet restart, inbox, refresh-settings, reset, resume, start,
  // subagents and turn-end, and never a `record`. So both rungs exited non-zero together on every
  // tick, the fallback's exit code was not read at all, and `main` returned 0 regardless. A
  // watcher outage reached nobody, and the unit reported success while it happened.
  //
  // A fallback that fails with its primary is not a fallback, so the rungs are unlike each other
  // now:
  //
  // 1 and 2 write the message file directly with `writeMessage`, the mailbox `ops seat inbox`
  //   drains. Two recipients cover a fault in one recipient's directory, but they share a writer,
  //   so they are one rung's worth of independence, not two.
  // 3 is the rung that shares nothing with them: this process exits non-zero and the unit goes
  //   red. It needs no git, no store and no mailbox. `services/audits-watchdog.ts:52` records
  //   that Alan asked for nothing to be pushed to his phone and that the unit going red is the
  //   whole signal, so this is the sanctioned alarm rather than a consolation.
  function deliver(to: string, content: string): string | null {
    const written = writeMessage({ to, from: alertFrom, warrant: "blocked", body: content })
    return written.kind === "written" ? null : written.detail
  }

  function page(content: string): boolean {
    const primary = deliver(alertTo, content)
    if (primary === null) return true
    process.stderr.write(
      `[liveness-probe] alert to ${alertTo} did not land (${primary}); trying ${alertFallback}\n`
    )
    const fallback = deliver(alertFallback, content)
    if (fallback === null) return true
    process.stderr.write(
      `[liveness-probe] alert to ${alertFallback} did not land either (${fallback}); ` +
        `no message reached anyone, so this tick exits non-zero and the unit is the alarm\n`
    )
    return false
  }

  let owed = 0
  let landed = 0
  let livenessSent = false
  let crashSent = false

  if (alert.page) {
    owed += 1
    livenessSent = page(
      `temper-watcher liveness: ${decision.reason.toUpperCase()} — the from-source watcher (temper-watcher.service) ` +
        `is not importing (last healthy realtime heartbeat ${ageLabel}, systemd unit ${unitActive ? "active" : "inactive"}). ` +
        `Game→web completion/task sync is halted. Fix: \`systemctl --user reset-failed temper-watcher.service && ` +
        `systemctl --user restart temper-watcher.service\`, then confirm \`ops temper watcher status\`.`
    )
    if (livenessSent) landed += 1
  }

  if (crashAlert.page && lastFatalMs !== null) {
    owed += 1
    crashSent = page(
      `temper-watcher CRASHED — the watcher logged a fatal exit at ${new Date(lastFatalMs).toISOString()} ` +
        `and was restarted. This does NOT show up as a liveness outage: the restart is sub-second and the healthy ` +
        `heartbeat resumes within seconds, so the staleness threshold never trips. Read the stack: ` +
        `\`grep -a -A20 "FATAL" ${join(logDir, "watcher.log")}\`.`
    )
    if (crashSent) landed += 1
  }

  // A COOLDOWN STAMP IS A RECORD THAT SOMEONE WAS TOLD. This wrote `alert.nextAlertedAtMs`
  // whatever became of the page, so a page that reached nobody still opened the hour of quiet
  // that follows one that did — the debounce kept the alarm from retrying an alert it had never
  // delivered. Found in the live state file on 2026-09-02: `alertedAtMs` held a stamp from within
  // the hour while every page it stood for had failed on a command that does not exist.
  //
  // The stamp now moves only where the message landed. An undelivered page leaves the prior stamp
  // where it was, so the next tick tries again rather than resting on it.
  // Only a page that was owed and did not land holds the stamp back. A healthy tick still clears
  // it to null, so the next outage is said at once rather than an hour after it begins.
  writeState(statePath, {
    alertedAtMs: alert.page && !livenessSent ? priorState.alertedAtMs : alert.nextAlertedAtMs,
    fatalAlertedAtMs:
      crashAlert.page && !crashSent ? priorState.fatalAlertedAtMs : crashAlert.nextFatalAlertedAtMs,
  })

  // `paged` said whether a page was DECIDED, never whether one arrived, so the line would read
  // `paged=true` for a page that reached nobody. It now counts what landed against what was owed,
  // and the tick exits non-zero where those differ.
  process.stdout.write(
    `temper-watcher liveness: ${decision.reason} (healthy=${decision.healthy}, last-healthy-heartbeat=${ageLabel}, ` +
      `unit=${unitActive ? "active" : "inactive"}, pages-owed=${owed}, pages-landed=${landed}, ` +
      `last-fatal=${lastFatalMs === null ? "none" : new Date(lastFatalMs).toISOString()}, crash-paged=${crashAlert.page})\n`
  )
  return landed === owed ? 0 : 1
}

if (import.meta.main) process.exit(await main(process.argv.slice(2)))
