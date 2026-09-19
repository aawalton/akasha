import {
  decideRemoteControl,
  type RemoteControlQuestion,
} from "akasha/agent/seat/supervisor/supervisor-remote-control/modules/decide/supervisor-remote-control-decide.module.code.ts"
import { SHAPE } from "akasha/code/type/narrowing/modules/shape/shape.module.code.ts"

const UNCLAIMED_SEAT = "unclaimed"

export function seatLabel(agentId: string | null): string {
  return agentId ?? UNCLAIMED_SEAT
}

export const REMOTE_CONTROL_DECISION = "remoteControl"

export const RemoteControlVerdictShape = SHAPE.object({
  seat: SHAPE.string(),
  remoteControl: SHAPE.boolean(),
})

export function remoteControlFallback(headless: boolean): boolean {
  return decideRemoteControl({ headless })
}

export function readRemoteControlQuestion(opts: { headless: boolean }): RemoteControlQuestion {
  return { headless: opts.headless }
}
