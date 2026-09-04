import { parseArgs } from "@akasha/command-system/parse-args"
import { dataError, inputError, operationalError } from "@akasha/errors-core/exit-code"
import { readTranscriptMtimeMs } from "@akasha/seat-system/agent-io-probe"
import {
  holdSeatPaneOpen,
  killSeatSession,
  launchSeatUnderTmux,
  respawnSeatUnderTmux,
} from "@akasha/seat-system/launch-seat-tmux"
import { resumeSeat } from "@akasha/seat-system/resume-seat"
import { liveResumeVerifySleep, resumeAndVerify } from "@akasha/seat-system/resume-verify"
import {
  describeAckTimeout,
  setRequestedAction,
  waitForActionCleared,
} from "@akasha/seat-system/seat-action"
import { seatRecord } from "@akasha/seat-system/seat-facts"
import { resolveSeatTargetFromFlagOrEnv } from "@akasha/seat-system/seat-handle"
import { DEFAULT_ACCOUNT } from "@akasha/seat-system/seat-launching"
import {
  isSeatMode,
  SEAT_MODE_HEADLESS,
  SEAT_MODE_INTERACTIVE,
  SEAT_MODES,
} from "@akasha/seat-system/seat-modes"
import { sweepSupersededAgentTrees } from "@akasha/seat-system/seat-recovery"
import { HELP } from "@akasha/seat-system/seat-resume-help"
import { decideSubagentGuard } from "@akasha/seat-system/subagent-guard"
import { standingSubagentsOf } from "@akasha/seat-system/subagent-page"
import { resolveTakeoverTarget, takeoverSeat } from "@akasha/seat-system/takeover-seat"
import { readStdinOrFile } from "@akasha/utils-fs/read-stdin-or-file"
import { shape } from "@akasha/utils-narrow/shape"
import { parseWindowDuration } from "../window-duration/window-duration.module.code.ts"

const DEFAULT_VERIFY_GRACE_MS = 30_000

const LAUNCH_ONLY = [
  "--prompt",
  "--prompt-file",
  "--boot-prompt",
  "--boot-prompt-file",
  "--verify",
  "--grace",
] as const

const SELF_ACTION = "restart" as const
const SELF_STATUS = "queued-on-idle" as const

async function readPromptFile(path: string): Promise<string> {
  return await readStdinOrFile(path)
}

async function graceWindowMs(value: string): Promise<number> {
  try {
    return parseWindowDuration(value, "--grace")
  } catch (err) {
    throw inputError(err instanceof Error ? err.message : String(err))
  }
}

function readSelfAgentId(): string | null {
  const parsed = shape.string().uuid().safeParse(process.env.AGENT_ID)
  return parsed.success ? parsed.data : null
}

function holdsLive(agentId: string): boolean {
  const seat = seatRecord(agentId)
  return seat !== null && seat.presence !== "absent"
}

function refuseWhereSubagentsWork(agentId: string, force: boolean): undefined {
  const seat = seatRecord(agentId)
  const guard = decideSubagentGuard({
    standing: standingSubagentsOf(agentId),
    targetLive: holdsLive(agentId),
    force,
    seatName: seat?.name ?? agentId,
    act: "Restarting",
  })
  if (guard.kind === "reject") throw inputError(guard.reason)
}

interface Launched {
  readonly agentId: string
  readonly name: string
  readonly pid: number
  readonly sessionId: string | undefined
  readonly status: string
}

function emitLaunched(handle: Launched, json: boolean, verify?: string): undefined {
  if (json) {
    process.stdout.write(
      `${JSON.stringify({ agent_id: handle.agentId, name: handle.name, pid: handle.pid, session_id: handle.sessionId, status: handle.status, ...(verify === undefined ? {} : { verify }) })}\n`
    )
    return
  }
  const tail = verify === undefined ? "" : `\t${verify}`
  process.stdout.write(`${handle.agentId}\t${handle.name}\t${handle.status}${tail}\n`)
}

interface RelaunchInput {
  readonly agentId: string
  readonly json: boolean
  readonly verify: boolean
  readonly graceMs: number
  readonly prompt: string | undefined
  readonly bootPrompt: string | undefined
}

async function relaunch(input: RelaunchInput): Promise<void> {
  const { agentId, json, verify, graceMs, prompt, bootPrompt } = input

  if (verify) {
    const { handle, verdict } = await resumeAndVerify(
      { agentId, graceMs, prompt, bootPrompt },
      {
        revive: resumeSeat,
        sampleTranscriptMtimeMs: readTranscriptMtimeMs,
        sampleOwnedRowUpdatedAtMs: () => null,
        now: Date.now,
        sleep: liveResumeVerifySleep,
      }
    )
    if (verdict === "wedged") {
      throw operationalError(
        `agent '${handle.name}' revived process-alive but io did NOT advance past the revive ` +
          `within ${graceMs}ms — a revive-into-menu-wedge: the resumed session is parked at the ` +
          "compaction resume menu, not progressing. Report it (do NOT re-revive — that only re-parks)."
      )
    }
    await sweepSupersededAgentTrees(agentId, handle.pid)
    emitLaunched(handle, json, verdict)
    return
  }

  const handle = await resumeSeat({ agentId, prompt, bootPrompt })
  await sweepSupersededAgentTrees(agentId, handle.pid)
  emitLaunched(handle, json)
}

async function cycleInPlace(
  agentId: string,
  json: boolean,
  now: boolean,
  relaunchInput: RelaunchInput
): Promise<void> {
  await setRequestedAction(agentId, { action: now ? "restart-now" : "restart" })
  const outcome = await waitForActionCleared(agentId)
  if (outcome.ok) {
    const status = now ? "restarted" : SELF_STATUS
    if (now) {
      await sweepSupersededAgentTrees(agentId, seatRecord(agentId)?.supervisorPid ?? undefined)
    }
    const name = seatRecord(agentId)?.name ?? agentId
    if (json) {
      process.stdout.write(`${JSON.stringify({ agent_id: agentId, name, status })}\n`)
    } else {
      process.stdout.write(`${agentId}\t${name}\t${status}\n`)
    }
    return
  }

  if (!holdsLive(agentId)) {
    await relaunch(relaunchInput)
    return
  }
  throw operationalError(describeAckTimeout("restart", outcome.reason))
}

export default async function seatResume(args: readonly string[]): Promise<void> {
  const parsed = parseArgs(help, args)

  const json = parsed.boolean("--json")
  const force = parsed.boolean("--force")
  const verify = parsed.boolean("--verify")
  const promptFile = parsed.string("--prompt-file")
  const promptArg = parsed.string("--prompt")
  const prompt = promptFile !== undefined ? await readPromptFile(promptFile) : promptArg
  if (prompt !== undefined && prompt.length === 0) {
    throw inputError("--prompt / --prompt-file payload is empty")
  }
  const bootPromptFile = parsed.string("--boot-prompt-file")
  const bootPromptArg = parsed.string("--boot-prompt")
  const bootPrompt =
    bootPromptFile !== undefined ? await readPromptFile(bootPromptFile) : bootPromptArg
  if (bootPrompt !== undefined && bootPrompt.length === 0) {
    throw inputError("--boot-prompt payload is empty")
  }
  const graceArg = parsed.string("--grace")
  const graceMs = graceArg != null ? await graceWindowMs(graceArg) : DEFAULT_VERIFY_GRACE_MS

  const startMode = parsed.string("--start-mode") ?? SEAT_MODE_HEADLESS
  if (!isSeatMode(startMode)) {
    throw inputError(
      `invalid --start-mode '${startMode}' (expected ${SEAT_MODES.map((one) => `'${one}'`).join(" or ")})`
    )
  }

  const launching = LAUNCH_ONLY.filter((flag) => args.includes(flag))

  if (startMode === SEAT_MODE_INTERACTIVE) {
    if (launching.length > 0) {
      throw inputError(
        `${launching.join(", ")} ${launching.length === 1 ? "is a launch flag" : "are launch flags"}, ` +
          "and `--start-mode interactive` puts a seat back on the session it already " +
          "has, so there is no first turn to give it. Drop them, or launch here with " +
          "`--start-mode headless`."
      )
    }
    const named = parsed.string("--agent-id") ?? process.env.AGENT_ID
    if (named === undefined || named.length === 0) {
      throw inputError(
        "[ops] seat not named — pass --agent-id <uuid|prefix|name> or set the AGENT_ID env var"
      )
    }
    const target = await resolveTakeoverTarget(named)
    refuseWhereSubagentsWork(target, force)
    const standing = seatRecord(target)?.name ?? null
    if (standing !== null) await holdSeatPaneOpen(standing)
    const taken = await takeoverSeat(target)
    if (!parsed.boolean("--no-launch")) {
      if (taken.name === null) {
        throw dataError(
          `seat '${taken.agentId}' spells no name, so there is no session for a terminal to ` +
            "attach to. Bring it back with `--start-mode headless`, which needs none."
        )
      }
      const seatLaunch = {
        name: taken.name,
        agentId: taken.agentId,
        account: DEFAULT_ACCOUNT,
        prompt: "",
        mode: startMode,
        resumeSessionId: taken.sessionId,
      }
      if (!(await respawnSeatUnderTmux(seatLaunch))) {
        await killSeatSession(taken.name)
        await launchSeatUnderTmux(seatLaunch)
      }
    }
    if (json) {
      process.stdout.write(
        `${JSON.stringify({ agent_id: taken.agentId, name: taken.name, session_id: taken.sessionId, took_over: taken.tookOver })}\n`
      )
      return
    }
    process.stdout.write(`${taken.agentId}\t${taken.sessionId}\n`)
    return
  }

  const agentId = await resolveSeatTargetFromFlagOrEnv(parsed.string("--agent-id"))

  if (readSelfAgentId() === agentId) {
    await setRequestedAction(agentId, { action: SELF_ACTION })
    if (json) {
      process.stdout.write(`${JSON.stringify({ agent_id: agentId, status: SELF_STATUS })}\n`)
    } else {
      process.stdout.write(`${agentId}\t${SELF_STATUS}\n`)
    }
    return
  }

  const seat = seatRecord(agentId)
  if (seat === null) throw dataError(`No seat found matching '${agentId}'`)

  const relaunchInput: RelaunchInput = { agentId, json, verify, graceMs, prompt, bootPrompt }

  if (holdsLive(agentId)) {
    if (launching.length > 0) {
      throw inputError(
        `agent '${seat.name ?? agentId}' is live, and ${launching.join(", ")} ` +
          `${launching.length === 1 ? "speaks" : "speak"} to a LAUNCH. A running seat already has a ` +
          "turn, so there is no first turn to give it and no transcript to hydrate: it is cycled " +
          "in place instead. Hand it work with `ops seat send`, which reaches a live seat and " +
          `revives a stopped one, or stop it first with \`akasha seat supervisor stop ${seat.name ?? agentId}\`.`
      )
    }
    refuseWhereSubagentsWork(agentId, force)
    await cycleInPlace(agentId, json, parsed.boolean("--now"), relaunchInput)
    return
  }

  await relaunch(relaunchInput)
}

export const help = HELP
