import { unclaimedTo } from "akasha/agent/message/modules/file/agent-message-file.module.code.ts"

export interface InboundMessageRow {
  readonly sender_agent_id: string | null
  readonly source: string
  readonly content: string
}

const MESSAGE_SOURCE = "user"

export function inboundMessagesTo(to: string): Promise<readonly InboundMessageRow[]> {
  return Promise.resolve(
    unclaimedTo(to).map((one) => ({
      sender_agent_id: one.from === "" ? null : one.from,
      source: MESSAGE_SOURCE,
      content: one.body,
    }))
  )
}
