import {
  askSupervisorDecide,
  SUPERVISOR_DECIDE_COMMAND,
} from "akasha/agents/seats/supervisors/modules/limit-resume-effects/supervisor-limit-resume-effects.module.code.ts"
import { LOG } from "akasha/seat-system/supervising/supervisor-config/supervisor-config.module.code.ts"
import {
  REMOTE_CONTROL_DECISION,
  RemoteControlVerdictShape,
  readRemoteControlQuestion,
  remoteControlFallback,
  seatLabel,
} from "akasha/seat-system/supervising/supervisor-remote-control-default/supervisor-remote-control-default.module.code.ts"
import { shape } from "akasha/utils/narrow/shape/shape.module.code.ts"

const SeatSpawnAnswerShape = shape.object({
  [REMOTE_CONTROL_DECISION]: shape.tuple([RemoteControlVerdictShape]),
})

export type SeatSpawnDecisions = {
  readonly remoteControl: boolean
}

export type SeatSpawnDeps = {
  readonly ask: (stdin: string) => Promise<unknown>
}

function fallback(headless: boolean): SeatSpawnDecisions {
  return { remoteControl: remoteControlFallback(headless) }
}

const DEFAULT_SEAT_SPAWN_DEPS: SeatSpawnDeps = {
  ask: askSupervisorDecide,
}

export async function resolveSeatSpawnDecisions(
  agentId: string | null,
  opts: { headless: boolean },
  deps: SeatSpawnDeps = DEFAULT_SEAT_SPAWN_DEPS
): Promise<SeatSpawnDecisions> {
  const seat = seatLabel(agentId)
  const question = readRemoteControlQuestion(opts)
  try {
    const answer = SeatSpawnAnswerShape.parse(
      await deps.ask(JSON.stringify({ [REMOTE_CONTROL_DECISION]: [{ seat, question }] }))
    )
    return { remoteControl: answer[REMOTE_CONTROL_DECISION][0].remoteControl }
  } catch (err) {
    const safe = fallback(opts.headless)
    console.warn(
      `${LOG} ${SUPERVISOR_DECIDE_COMMAND} could not be reached for ${seat}, so this spawn takes ` +
        `Remote Control ${safe.remoteControl ? "on" : "off"}:`,
      err
    )
    return safe
  }
}
