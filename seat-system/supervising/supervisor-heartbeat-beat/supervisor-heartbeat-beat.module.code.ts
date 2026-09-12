import { join } from "node:path"
import { runningModeIn } from "akasha/agents/seats/modules/modes/seat-modes.module.code.ts"
import {
  type BeatReport,
  beat,
} from "akasha/agents/seats/modules/page-beat/seat-page-beat.module.code.ts"
import { nameFromHistory } from "akasha/agents/seats/modules/page-history/seat-page-history.module.code.ts"
import type { Outcome } from "akasha/changes/modules/gated-write/gated-write.module.code.ts"
import {
  ownRepoRoot,
  resolveRoots,
} from "akasha/pages/checkout-roots/checkout-roots.module.code.ts"
import { besideAt } from "akasha/pages/file-name/page-file-name.module.code.ts"
import { listedAt } from "akasha/pages/indexes/reading/index-reading.module.code.ts"
import { keepBeside } from "akasha/seat-system/seat-beside/seat-beside.module.code.ts"
import {
  formatSeatProcKey,
  readSeatProcKey,
} from "akasha/seat-system/seat-proc-key/seat-proc-key.module.code.ts"
import { composedNameOf } from "akasha/seat-system/seat-rename/seat-rename.module.code.ts"
import { clearRotated } from "akasha/seat-system/seat-rotated-session/seat-rotated-session.module.code.ts"
import { keepSession } from "akasha/seat-system/seat-session/seat-session.module.code.ts"
import { keepTranscript } from "akasha/seat-system/seat-transcript-path/seat-transcript-path.module.code.ts"
import {
  getCurrentAgentIdForSelfHeal,
  getCurrentSessionIdForSelfHeal,
} from "akasha/seat-system/self-healing/supervisor-self-heal-state/supervisor-self-heal-state.module.code.ts"
import { LOG } from "akasha/seat-system/supervising/supervisor-config/supervisor-config.module.code.ts"
import { ran } from "akasha/utils/run/running/running.module.code.ts"

const MODULE = "module"

const BEAT_SLUG = "seat-page-beat"

const CODE = "code"

const TS = "ts"

function beatAt(): string {
  const root = ownRepoRoot()
  const page = listedAt(root, MODULE, BEAT_SLUG)[0]
  const at = page === undefined ? null : besideAt(page.path, CODE, TS)
  if (at === null) {
    throw new Error(
      `no \`${MODULE}\` is slugged \`${BEAT_SLUG}\`, so no seat page would be written`
    )
  }
  return join(root, at)
}

function beatArgv(args: readonly string[]): readonly string[] {
  return [beatAt(), ...args]
}

function parseBeatReport(held: unknown): BeatReport | null {
  if (typeof held !== "object" || held === null || !("outcome" in held)) return null
  return held as BeatReport
}

function reportFrom(output: string, code: number): BeatReport {
  const line = output.trim().split("\n").at(-1) ?? ""
  try {
    const parsed: unknown = JSON.parse(line)
    const report = parseBeatReport(parsed)
    if (report !== null) return report
  } catch {}
  const said = output.trim()
  return {
    outcome: {
      kind: "refused",
      detail: said === "" ? `the seat page writer exited ${String(code)} saying nothing` : said,
    },
    seat: null,
  }
}

function runBeat(args: readonly string[]): BeatReport {
  try {
    const done = ran([process.execPath, ...beatArgv(args)])
    if (done.err !== "") process.stderr.write(done.err)
    return reportFrom(done.out, done.code)
  } catch (err) {
    return {
      outcome: { kind: "refused", detail: `the seat page writer did not run: ${String(err)}` },
      seat: null,
    }
  }
}

async function beatReport(args: readonly string[]): Promise<BeatReport> {
  try {
    return await beat(args)
  } catch (err) {
    return {
      outcome: { kind: "refused", detail: `the seat page writer did not run: ${String(err)}` },
      seat: null,
    }
  }
}

export function writeSeatProcessKey(seatName: string, supervisorPid: number): undefined {
  const key = readSeatProcKey(supervisorPid)
  if (key === null) return undefined
  try {
    keepBeside(seatName, {
      "supervisor-process": formatSeatProcKey(key),
      mode: runningModeIn(process.argv),
    })
  } catch (err) {
    console.error(`${LOG} heartbeat: writing the seat process key failed for ${seatName}:`, err)
  }
}

export function keepSeatSession(agentId: string, sessionId: string): undefined {
  keepSession(agentId, sessionId)
  const report = runBeat(["--agent", agentId, "--session", sessionId])
  if (report.outcome.kind === "refused") {
    console.error(
      `${LOG} the session did not reach ${report.seat ?? agentId}: ${report.outcome.detail}`
    )
  }
}

export function keepSeatTranscript(agentId: string, transcriptPath: string): undefined {
  keepTranscript(agentId, transcriptPath)
  const report = runBeat(["--agent", agentId, "--transcript", transcriptPath])
  if (report.outcome.kind === "refused") {
    console.error(
      `${LOG} the transcript path did not reach ${report.seat ?? agentId}: ${report.outcome.detail}`
    )
  }
}

export function clearSeatRotation(agentId: string): undefined {
  clearRotated(agentId)
  const report = runBeat(["--agent", agentId, "--clear-rotation"])
  if (report.outcome.kind === "refused") {
    console.error(
      `${LOG} the rotation was not cleared from ${report.seat ?? agentId}: ${report.outcome.detail}`
    )
  }
}

export async function keepSeatPage(
  agentId: string,
  seatName: string,
  account: string | null = null
): Promise<void> {
  const selfHealAgent = getCurrentAgentIdForSelfHeal()
  const selfHealSession = getCurrentSessionIdForSelfHeal()
  const report = await beatReport([
    "--agent",
    agentId,
    ...(account === null ? [] : ["--account", account]),
    ...(selfHealAgent === null ? [] : ["--self-heal-agent", selfHealAgent]),
    ...(selfHealSession === null ? [] : ["--self-heal-session", selfHealSession]),
  ])
  if (report.outcome.kind === "refused") {
    console.error(
      `${LOG} heartbeat: writing the seat page failed for ${report.seat ?? seatName}: ${report.outcome.detail}`
    )
  }
}

export function takeSeatPage(agentId: string, stopReason: string): Outcome {
  return runBeat(["--agent", agentId, "--remove", stopReason]).outcome
}

export async function recordHeartbeat(
  agentId: string,
  account: string | null = null
): Promise<void> {
  const seatName = composedNameOf(agentId) ?? nameFromHistory(agentId, resolveRoots())
  if (seatName === null) return
  writeSeatProcessKey(seatName, process.pid)
  await keepSeatPage(agentId, seatName, account)
}
