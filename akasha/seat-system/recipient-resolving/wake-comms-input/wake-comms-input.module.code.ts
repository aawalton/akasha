import { AGENT_SENDER_PREFIX } from "@tools/lib/wake-armed-specs"
import type { CommsInput } from "../seat-wake-rules/seat-wake-rules.module.code.ts"

export interface WakeMessageRow {
  readonly senderAgentId: string | null
  readonly source: string
  readonly content: string
}

export function wakeCommsInput(msg: WakeMessageRow): CommsInput {
  return {
    sender: msg.senderAgentId === null ? msg.source : `${AGENT_SENDER_PREFIX}${msg.senderAgentId}`,
    content: msg.content,
  }
}
