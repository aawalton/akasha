import type { Outcome } from "@akasha/command-system/gated-write"
import { resolveRoots } from "@akasha/pages/checkout-roots"
import { LOG } from "@akasha/seat-system/supervisor-config"
import {
  getCurrentAgentIdForSelfHeal,
  getCurrentSessionIdForSelfHeal,
} from "@akasha/seat-system/supervisor-self-heal-state"
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

// `beat` writes the page over an await, and the four writes below are called from places that
// cannot await one: `clearSeatRotation` is reached through a rotation watcher whose callback is
// declared as returning a value rather than a promise. They run the beat as a child, which is
// what blocks until the page is written. The specifier here is the one the import above holds,
// so moving the beat module is a diagnostic rather than a path that is not there at a beat.
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
    const proc = Bun.spawnSync([process.execPath, ...beatArgv(args)], {
      stdout: "pipe",
      stderr: "inherit",
    })
    return reportFrom(proc.stdout.toString(), proc.exitCode ?? 1)
  } catch (err) {
    return {
      outcome: { kind: "refused", detail: `the seat page writer did not run: ${String(err)}` },
      seat: null,
    }
  }
}

// `beat` throws where what it is handed says nothing it can write for. That was a child exiting
// non-zero before, and a heartbeat swallows it either way, so no beat fails its caller.
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

// THE PROCESS KEY AND THE MODE ARE WRITTEN TOGETHER BECAUSE THEY ARE ONE OBSERVATION. Both are
// facts about the supervisor running this code: which process is holding the seat, and which of
// the two modes that process was execed into. Writing them on one beat is what lets a reader take
// the pair as answering for one another rather than as two values that might have come from two
// supervisors.
//
// THE MODE WAS UNWRITTEN UNTIL NOW AND THAT COST FOUR SEATS THEIR REMOTE CONTROL. A seat page
// states the mode it was asked to start in, once, and nothing ever revisits it; the mode a
// supervisor is actually running in was decided from its command line at exec, handed to the
// child as an environment variable, and then dropped. `akasha seat` printed the stated mode under
// the heading `mode`, so four seats read as `interactive` for days while their supervisors held
// `--headless` — and every reader, including the one deciding remote control, agreed with the
// page. Nothing in the fleet could tell the two apart, so nothing reported the drift.
export function writeSeatProcessKey(seatName: string, supervisorPid: number): void {
  const key = readSeatProcKey(supervisorPid)
  if (key === null) return
  try {
    keepBeside(seatName, {
      "supervisor-process": formatSeatProcKey(key),
      mode: runningModeIn(process.argv),
    })
  } catch (err) {
    console.error(`${LOG} heartbeat: writing the seat process key failed for ${seatName}:`, err)
  }
}

export function keepSeatSession(agentId: string, sessionId: string): void {
  keepSession(agentId, sessionId)
  const report = runBeat(["--agent", agentId, "--session", sessionId])
  if (report.outcome.kind === "refused") {
    console.error(
      `${LOG} the session did not reach ${report.seat ?? agentId}: ${report.outcome.detail}`
    )
  }
}

export function keepSeatTranscript(agentId: string, transcriptPath: string): void {
  keepTranscript(agentId, transcriptPath)
  const report = runBeat(["--agent", agentId, "--transcript", transcriptPath])
  if (report.outcome.kind === "refused") {
    console.error(
      `${LOG} the transcript path did not reach ${report.seat ?? agentId}: ${report.outcome.detail}`
    )
  }
}

export function clearSeatRotation(agentId: string): void {
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
