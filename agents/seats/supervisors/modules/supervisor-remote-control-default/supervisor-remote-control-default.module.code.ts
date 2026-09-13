import {
  decideRemoteControl,
  type RemoteControlQuestion,
} from "akasha/agents/seats/supervisors/modules/supervisor-remote-control-decide/supervisor-remote-control-decide.module.code.ts"
import { shape } from "akasha/utils/narrow/modules/shape/shape.module.code.ts"

const UNCLAIMED_SEAT = "unclaimed"

export function seatLabel(agentId: string | null): string {
  return agentId ?? UNCLAIMED_SEAT
}

export const REMOTE_CONTROL_DECISION = "remoteControl"

export const RemoteControlVerdictShape = shape.object({
  seat: shape.string(),
  remoteControl: shape.boolean(),
})

export function remoteControlFallback(headless: boolean): boolean {
  return decideRemoteControl({ headless })
}

export function readRemoteControlQuestion(opts: { headless: boolean }): RemoteControlQuestion {
  return { headless: opts.headless }
}
