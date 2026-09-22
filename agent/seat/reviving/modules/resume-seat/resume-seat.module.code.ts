import {
  type MaterializeTranscriptResult,
  materializeLocalTranscript,
} from "akasha/agent/claude-code/modules/transcript-materialize/transcript-materialize.module.code.ts"
import {
  type LaunchSeatOpts,
  type LaunchSeatResult,
  launchSeatUnderTmux,
  liveSessionHolds,
} from "akasha/agent/seat/launching/modules/launch-seat-tmux/launch-seat-tmux.module.code.ts"
import { SEAT_MODE_HEADLESS } from "akasha/agent/seat/launching/modules/seat-modes/seat-modes.module.code.ts"
import { DEFAULT_ACCOUNT } from "akasha/agent/seat/launching/seat-launching.module.code.ts"
import {
  decideSpawnGuard,
  type SpawnGuardDecision,
  type SpawnGuardInput,
} from "akasha/agent/seat/name-claiming/modules/spawn-guard/spawn-guard.module.code.ts"
import type { SeatPresence } from "akasha/agent/seat/observation/modules/seat-proc-key/seat-proc-key.module.code.ts"
import { terminatePriorAgentTree } from "akasha/agent/seat/reviving/modules/seat-recovery/seat-recovery.module.code.ts"
import { resolveRelaunchTarget } from "akasha/agent/seat/reviving/modules/seat-relaunch-target/seat-relaunch-target.module.code.ts"
import { decideReviveLaunch } from "akasha/agent/seat/reviving/modules/seat-revive-launch-decide/seat-revive-launch-decide.module.code.ts"
import { clearRequestedAction } from "akasha/agent/seat/supervisor/supervisor-action/modules/supervisor-agent-action-clear/supervisor-agent-action-clear.module.code.ts"
import { SEAT_START_DIR } from "akasha/agent/seat/supervisor/supervisor-process/modules/supervisor-config/supervisor-config.module.code.ts"
import {
  dataError,
  operationalError,
} from "akasha/alan/harness/errors-core/modules/exit-code/exit-code.module.code.ts"
import "akasha/code/editor/extension/vscode-api/vscode-api.type-declaration.d.ts"

export interface ResumeTarget {
  readonly name: string | null
  readonly account: string | null
  readonly startMode: string | null
  readonly presence: SeatPresence
  readonly sessionId: string | null
}

export type ResolvedResumeTarget = { readonly target: ResumeTarget } | { readonly error: string }

export interface SeatHandle {
  readonly agentId: string
  readonly name: string
  readonly pid: number
  readonly sessionId: string | undefined
  readonly status: string
}

export interface ResumeSeatInput {
  readonly agentId: string
  readonly prompt?: string
  readonly bootPrompt?: string
}

export interface MaterializeInput {
  readonly agentId: string
  readonly sessionId: string
  readonly cwd: string
}

export interface ResumeSeatDeps {
  readonly resolveTarget: (agentId: string) => Promise<ResolvedResumeTarget>
  readonly decideGuard: (input: SpawnGuardInput) => SpawnGuardDecision
  readonly liveSessionHolds: (name: string) => Promise<boolean>
  readonly materializeTranscript: (input: MaterializeInput) => MaterializeTranscriptResult
  readonly clearRequestedAction: (agentId: string) => Promise<void>
  readonly terminatePriorTree: (agentId: string) => Promise<readonly number[]>
  readonly launch: (opts: LaunchSeatOpts) => Promise<LaunchSeatResult>
}

async function liveResumeSeatDeps(): Promise<ResumeSeatDeps> {
  return {
    resolveTarget: resolveRelaunchTarget,
    decideGuard: decideSpawnGuard,
    liveSessionHolds,
    materializeTranscript: materializeLocalTranscript,
    clearRequestedAction,
    terminatePriorTree: terminatePriorAgentTree,
    launch: launchSeatUnderTmux,
  }
}

export async function resumeSeat(
  input: ResumeSeatInput,
  injected?: ResumeSeatDeps
): Promise<SeatHandle> {
  const deps = injected ?? (await liveResumeSeatDeps())

  const resolved = await deps.resolveTarget(input.agentId)
  if ("error" in resolved) throw dataError(resolved.error)
  const { name, account, startMode, presence, sessionId } = resolved.target

  if (name === null) {
    throw dataError(
      `agent ${input.agentId} has no stable name — revive targets named agents ` +
        "(set one with `bun tools/seat.ts` before stopping, or resume interactively with `sr`)"
    )
  }

  const guard = deps.decideGuard({ holder: presence })
  if (guard.kind === "reject") {
    throw dataError(
      `agent '${name}' is already live — stop it first with \`akasha seat supervisor stop ${name}\`. ` +
        "`akasha seat resume` reaches this only where nothing live holds the seat; against a live " +
        "one it cycles the seat in place rather than launching a second supervisor over it."
    )
  }

  if (await deps.liveSessionHolds(name)) {
    throw dataError(
      `agent '${name}' is held by a live tmux session, so it is up or coming up. Nothing was ` +
        "signalled: a seat whose page has not landed yet is booting rather than gone."
    )
  }

  const plan = decideReviveLaunch({
    sessionId,
    prompt: input.prompt,
    bootPrompt: input.bootPrompt,
  })

  if (plan.materializeTranscript && sessionId !== null) {
    deps.materializeTranscript({
      agentId: input.agentId,
      sessionId,
      cwd: SEAT_START_DIR,
    })
  }

  await deps.clearRequestedAction(input.agentId)
  await deps.terminatePriorTree(input.agentId)

  let launched: LaunchSeatResult
  try {
    launched = await deps.launch({
      name,
      agentId: input.agentId,
      account: account ?? DEFAULT_ACCOUNT,
      prompt: plan.prompt,
      mode: startMode ?? SEAT_MODE_HEADLESS,
      resumeSessionId: plan.resumeSessionId,
    })
  } catch (err) {
    throw operationalError(err instanceof Error ? err.message : String(err))
  }
  const { pid } = launched

  return {
    agentId: input.agentId,
    name,
    pid,
    sessionId: plan.resumeSessionId,
    status: plan.status,
  }
}
