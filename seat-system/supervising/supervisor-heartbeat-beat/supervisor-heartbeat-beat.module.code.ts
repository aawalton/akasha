import { resolveRoots } from "@akasha/pages/checkout-roots"
import type { Outcome } from "@akasha/seat-system/gated-write"
import { LOG } from "@akasha/seat-system/supervisor-config"
import { ran } from "@akasha/utils/run/running"
import { keepBeside } from "../../seat-beside/seat-beside.module.code.ts"
import { runningModeIn } from "../../seat-modes/seat-modes.module.code.ts"
import { type BeatReport, beat } from "../../seat-page-beat/seat-page-beat.module.code.ts"
import { nameFromHistory } from "../../seat-page-history/seat-page-history.module.code.ts"
import {
  formatSeatProcKey,
  readSeatProcKey,
} from "../../seat-proc-key/seat-proc-key.module.code.ts"
import { composedNameOf } from "../../seat-rename/seat-rename.module.code.ts"
import { clearRotated } from "../../seat-rotated-session/seat-rotated-session.module.code.ts"
import { keepSession } from "../../seat-session/seat-session.module.code.ts"
import { keepTranscript } from "../../seat-transcript-path/seat-transcript-path.module.code.ts"
import {
  getCurrentAgentIdForSelfHeal,
  getCurrentSessionIdForSelfHeal,
} from "../../self-healing/supervisor-self-heal-state/supervisor-self-heal-state.module.code.ts"

const BEAT = new URL("../../seat-page-beat/seat-page-beat.module.code.ts", import.meta.url).pathname

function beatArgv(args: readonly string[]): readonly string[] {
  return [BEAT, ...args]
}

function reportFrom(output: string, code: number): BeatReport {
  const line = output.trim().split("\n").at(-1) ?? ""
  try {
    const parsed: unknown = JSON.parse(line)
    if (typeof parsed === "object" && parsed !== null && "outcome" in parsed) {
      return parsed as BeatReport
    }
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
