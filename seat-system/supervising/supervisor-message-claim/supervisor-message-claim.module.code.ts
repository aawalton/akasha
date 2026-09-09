import {
  claimedBefore,
  releaseClaim,
} from "../../messaging/message-file/message-file.module.code.ts"
import { seatNameForAgent } from "../../seat-presence-read/seat-presence-read.module.code.ts"

export interface ClaimedBeforeRow {
  readonly id: string
  readonly claimedAtMs: number
}

export function readClaimedBefore(
  targetAgentId: string,
  before: Date
): Promise<readonly ClaimedBeforeRow[]> {
  const to = seatNameForAgent(targetAgentId)
  if (to === null) return Promise.resolve([])
  const held = claimedBefore(to, before.getTime()).map((one) => ({
    id: one.id,
    claimedAtMs: one.claimedAtMs ?? 0,
  }))
  return Promise.resolve(held)
}

export function releaseMessageClaim(targetAgentId: string, messageId: string): Promise<undefined> {
  const to = seatNameForAgent(targetAgentId)
  if (to !== null) releaseClaim(to, messageId)
  return Promise.resolve(undefined)
}
