import { akashaRoot, resolveRoots } from "@akasha/pages-system/checkout-roots"
import { LOG } from "@akasha/seat-system/supervisor-config"
import {
  getCurrentAgentIdForSelfHeal,
  getCurrentSessionIdForSelfHeal,
} from "@akasha/seat-system/supervisor-self-heal-state"
import type { Outcome } from "@tools/lib/gated-write"
import { keepBeside } from "@tools/lib/seat-beside"
import { nameFromHistory } from "@tools/lib/seat-page-history"
import { composedNameOf } from "@tools/lib/seat-rename"
import { clearRotated } from "@tools/lib/seat-rotated-session"
import { keepSession } from "@tools/lib/seat-session"
import { keepTranscript } from "@tools/lib/seat-transcript-path"
import {
  formatSeatProcKey,
  readSeatProcKey,
} from "../../seat-proc-key/seat-proc-key.module.code.ts"

const BEAT = "seat-page-beat.ts"

export interface BeatReport {
  readonly outcome: Outcome
  readonly seat: string | null
}

function beatArgv(args: readonly string[]): readonly string[] {
  return [`${akashaRoot()}/tools/${BEAT}`, ...args]
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

async function runBeatAsync(args: readonly string[]): Promise<BeatReport> {
  try {
    const proc = Bun.spawn([process.execPath, ...beatArgv(args)], {
      stdout: "pipe",
      stderr: "inherit",
    })
    const output = await new Response(proc.stdout).text()
    return reportFrom(output, await proc.exited)
  } catch (err) {
    return {
      outcome: { kind: "refused", detail: `the seat page writer did not run: ${String(err)}` },
      seat: null,
    }
  }
}

export function writeSeatProcessKey(seatName: string, supervisorPid: number): void {
  const key = readSeatProcKey(supervisorPid)
  if (key === null) return
  try {
    keepBeside(seatName, { "supervisor-process": formatSeatProcKey(key) })
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
  const report = await runBeatAsync([
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
