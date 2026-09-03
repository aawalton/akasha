import {
  decideRemoteControl,
  type RemoteControlQuestion,
} from "@akasha/seat-system/supervisor-remote-control-decide"
import { shape } from "@tools/lib/shape"

export type { RemoteControlQuestion }

export const UNCLAIMED_SEAT = "unclaimed"

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
