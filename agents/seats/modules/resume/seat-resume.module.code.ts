import { readTranscriptMtimeMs } from "akasha/agents/io-probe/io-probe.module.code.ts"
import {
  describeAckTimeout,
  setRequestedAction,
  waitForActionCleared,
} from "akasha/agents/seats/modules/action/seat-action.module.code.ts"
import { seatRecord } from "akasha/agents/seats/modules/facts/seat-facts.module.code.ts"
import {
  NONE_NAMED,
  resolveSeatTargetCli,
  resolveSeatTargetFromFlagOrEnv,
} from "akasha/agents/seats/modules/handle/seat-handle.module.code.ts"
import {
  holdSeatPaneOpen,
  killSeatSession,
  launchSeatUnderTmux,
  respawnSeatUnderTmux,
} from "akasha/agents/seats/modules/launch-seat-tmux/launch-seat-tmux.module.code.ts"
import { DEFAULT_ACCOUNT } from "akasha/agents/seats/modules/launching/seat-launching.module.code.ts"
import {
  isSeatMode,
  SEAT_MODE_HEADLESS,
  SEAT_MODE_INTERACTIVE,
  SEAT_MODES,
} from "akasha/agents/seats/modules/modes/seat-modes.module.code.ts"
import { sweepSupersededAgentTrees } from "akasha/agents/seats/modules/recovery/seat-recovery.module.code.ts"
import { HELP } from "akasha/agents/seats/modules/resume-help/seat-resume-help.module.code.ts"
import { resumeSeat as relaunchStoppedSeat } from "akasha/agents/seats/modules/resume-seat/resume-seat.module.code.ts"
import {
  liveResumeVerifySleep,
  resumeAndVerify,
} from "akasha/agents/seats/modules/resume-verify/resume-verify.module.code.ts"
import type { ReviveIoVerdict } from "akasha/agents/seats/modules/revive-io-verify-decide/seat-revive-io-verify-decide.module.code.ts"
import {
  type TakenSeat,
  takeoverSeat,
} from "akasha/agents/seats/modules/takeover-seat/takeover-seat.module.code.ts"
import { parseWindowDuration } from "akasha/agents/seats/modules/window-duration/window-duration.module.code.ts"
import { decideSubagentGuard } from "akasha/agents/subagents/modules/guard/subagent-guard.module.code.ts"
import { standingSubagentsOf } from "akasha/agents/subagents/modules/page/subagent-page.module.code.ts"
import {
  dataError,
  exitCodeForThrowable,
  inputError,
  operationalError,
} from "akasha/alan/harness/errors-core/exit-code/exit-code.module.code.ts"
import { parseArgs } from "akasha/commands/modules/parse-args/parse-args.module.code.ts"
import { readStdinOrFile } from "akasha/utils/fs/read-stdin-or-file/read-stdin-or-file.module.code.ts"
import { shape } from "akasha/utils/narrow/shape/shape.module.code.ts"

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

export interface ResumeSeatRequest {
  readonly agentId: string
  readonly verify?: boolean
  readonly graceMs?: number
  readonly force?: boolean
  readonly now?: boolean
  readonly prompt?: string
  readonly bootPrompt?: string
  readonly selfAgentId?: string | null
}

export type ResumedSeat =
  | { readonly kind: "queued"; readonly agentId: string; readonly status: string }
  | {
      readonly kind: "cycled"
      readonly agentId: string
      readonly name: string
      readonly status: string
    }
  | {
      readonly kind: "relaunched"
      readonly agentId: string
      readonly name: string
      readonly pid: number
      readonly sessionId: string | undefined
      readonly status: string
      readonly verify: ReviveIoVerdict | undefined
    }
  | {
      readonly kind: "wedged"
      readonly agentId: string
      readonly name: string
      readonly graceMs: number
    }

export interface ResumeSeatInteractivelyRequest {
  readonly named: string
  readonly force?: boolean
  readonly launch?: boolean
}

interface RelaunchInput {
  readonly agentId: string
  readonly verify: boolean
  readonly graceMs: number
  readonly prompt: string | undefined
  readonly bootPrompt: string | undefined
}

function launchOnlyStated(request: ResumeSeatRequest): readonly string[] {
  const named: string[] = []
  if (request.prompt !== undefined) named.push("--prompt")
  if (request.bootPrompt !== undefined) named.push("--boot-prompt")
  if (request.verify === true) named.push("--verify")
  if (request.graceMs !== undefined) named.push("--grace")
  return named
}

async function relaunch(input: RelaunchInput, done: string[]): Promise<ResumedSeat> {
  const { agentId, verify, graceMs, prompt, bootPrompt } = input

  if (verify) {
    const { handle, verdict } = await resumeAndVerify(
      { agentId, graceMs, prompt, bootPrompt },
      {
        revive: relaunchStoppedSeat,
        sampleTranscriptMtimeMs: readTranscriptMtimeMs,
        sampleOwnedRowUpdatedAtMs: () => null,
        now: Date.now,
        sleep: liveResumeVerifySleep,
      }
    )
    done.push(`revived ${handle.agentId} in \`${handle.name}\` at pid ${handle.pid}`)
    if (verdict === "wedged") {
      return { kind: "wedged", agentId: handle.agentId, name: handle.name, graceMs }
    }
    await sweepSupersededAgentTrees(agentId, handle.pid)
    return {
      kind: "relaunched",
      agentId: handle.agentId,
      name: handle.name,
      pid: handle.pid,
      sessionId: handle.sessionId,
      status: handle.status,
      verify: verdict,
    }
  }

  const handle = await relaunchStoppedSeat({ agentId, prompt, bootPrompt })
  done.push(`revived ${handle.agentId} in \`${handle.name}\` at pid ${handle.pid}`)
  await sweepSupersededAgentTrees(agentId, handle.pid)
  return {
    kind: "relaunched",
    agentId: handle.agentId,
    name: handle.name,
    pid: handle.pid,
    sessionId: handle.sessionId,
    status: handle.status,
    verify: undefined,
  }
}

async function cycleInPlace(
  agentId: string,
  now: boolean,
  relaunchInput: RelaunchInput,
  done: string[]
): Promise<ResumedSeat> {
  const action = now ? "restart-now" : "restart"
  await setRequestedAction(agentId, { action })
  done.push(`armed \`${action}\` on ${agentId}`)
  const outcome = await waitForActionCleared(agentId)
  if (outcome.ok) {
    const status = now ? "restarted" : SELF_STATUS
    if (now) {
      await sweepSupersededAgentTrees(agentId, seatRecord(agentId)?.supervisorPid ?? undefined)
    }
    const name = seatRecord(agentId)?.name ?? agentId
    return { kind: "cycled", agentId, name, status }
  }

  if (!holdsLive(agentId)) return await relaunch(relaunchInput, done)
  throw operationalError(describeAckTimeout("restart", outcome.reason))
}

export async function resumeSeat(
  request: ResumeSeatRequest,
  done: string[] = []
): Promise<ResumedSeat> {
  const { agentId } = request
  const verify = request.verify === true
  const graceMs = request.graceMs ?? DEFAULT_VERIFY_GRACE_MS
  const self = request.selfAgentId === undefined ? readSelfAgentId() : request.selfAgentId

  if (self === agentId) {
    await setRequestedAction(agentId, { action: SELF_ACTION })
    return { kind: "queued", agentId, status: SELF_STATUS }
  }

  const seat = seatRecord(agentId)
  if (seat === null) throw dataError(`\`${agentId}\` names no seat`)

  const relaunchInput: RelaunchInput = {
    agentId,
    verify,
    graceMs,
    prompt: request.prompt,
    bootPrompt: request.bootPrompt,
  }

  if (holdsLive(agentId)) {
    const launching = launchOnlyStated(request)
    if (launching.length > 0) {
      throw inputError(
        `agent '${seat.name ?? agentId}' is live, and ${launching.join(", ")} ` +
          `${launching.length === 1 ? "speaks" : "speak"} to a LAUNCH. A running seat already has a ` +
          "turn, so there is no first turn to give it and no transcript to hydrate: it is cycled " +
          "in place instead. Drop the launch flags, or stop it first with " +
          `\`akasha seat supervisor stop ${seat.name ?? agentId}\`.`
      )
    }
    refuseWhereSubagentsWork(agentId, request.force === true)
    return await cycleInPlace(agentId, request.now === true, relaunchInput, done)
  }

  return await relaunch(relaunchInput, done)
}

export async function resumeSeatInteractively(
  request: ResumeSeatInteractivelyRequest,
  done: string[] = []
): Promise<TakenSeat> {
  const target = await resolveSeatTargetCli(request.named)
  refuseWhereSubagentsWork(target, request.force === true)
  const held = seatRecord(target)?.name ?? null
  if (held !== null) {
    await holdSeatPaneOpen(held)
    done.push(`held the pane of \`${held}\` open`)
  }
  const taken = await takeoverSeat(target)
  done.push(`took ${taken.agentId} over`)
  if (request.launch !== false) {
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
      mode: SEAT_MODE_INTERACTIVE,
      resumeSessionId: taken.sessionId,
    }
    if (await respawnSeatUnderTmux(seatLaunch)) {
      done.push(`respawned \`${taken.name}\` in place`)
    } else {
      await killSeatSession(taken.name)
      done.push(`killed the tmux session \`${taken.name}\``)
      await launchSeatUnderTmux(seatLaunch)
      done.push(`launched ${taken.agentId} in \`${taken.name}\` under tmux, interactive`)
    }
  }
  return taken
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

function emitResumed(resumed: ResumedSeat, json: boolean): undefined {
  if (resumed.kind === "wedged") {
    throw operationalError(
      `agent '${resumed.name}' revived process-alive but io did NOT advance past the revive ` +
        `within ${resumed.graceMs}ms — a revive-into-menu-wedge: the resumed session is parked at the ` +
        "compaction resume menu, not progressing. Report it (do NOT re-revive — that only re-parks)."
    )
  }
  if (resumed.kind === "queued") {
    if (json) {
      process.stdout.write(
        `${JSON.stringify({ agent_id: resumed.agentId, status: resumed.status })}\n`
      )
      return
    }
    process.stdout.write(`${resumed.agentId}\t${resumed.status}\n`)
    return
  }
  if (resumed.kind === "cycled") {
    if (json) {
      process.stdout.write(
        `${JSON.stringify({ agent_id: resumed.agentId, name: resumed.name, status: resumed.status })}\n`
      )
      return
    }
    process.stdout.write(`${resumed.agentId}\t${resumed.name}\t${resumed.status}\n`)
    return
  }
  emitLaunched(resumed, json, resumed.verify)
}

export default async function seatResume(
  args: readonly string[],
  done: string[] = []
): Promise<void> {
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
  const graceMs = graceArg != null ? await graceWindowMs(graceArg) : undefined

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
    const named =
      parsed.string("--agent-id") ?? shape.string().optional().parse(process.env.AGENT_ID)
    if (named === undefined || named.length === 0) {
      throw inputError(NONE_NAMED)
    }
    const taken = await resumeSeatInteractively(
      { named, force, launch: !parsed.boolean("--no-launch") },
      done
    )
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

  const resumed = await resumeSeat(
    { agentId, verify, graceMs, force, now: parsed.boolean("--now"), prompt, bootPrompt },
    done
  )
  emitResumed(resumed, json)
}

export const help = HELP

if (import.meta.main) {
  seatResume(process.argv.slice(2)).catch((err: unknown) => {
    process.stderr.write(`${err instanceof Error ? err.message : String(err)}\n`)
    process.exit(exitCodeForThrowable(err))
  })
}
