import { claimedBefore, releaseClaim } from "@tools/lib/message-file"
import { seatNameForAgent } from "../../messages-agent-tools/messages-agent-tools.module.code.ts"

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

export function releaseMessageClaim(targetAgentId: string, messageId: string): Promise<void> {
  const to = seatNameForAgent(targetAgentId)
  if (to !== null) releaseClaim(to, messageId)
  return Promise.resolve()
}
