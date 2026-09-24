import type { AgentMessage } from "akasha/agent/message/agent-message.page-type.types.ts"

export const messageE201a66d0513 = {
  id: "4b23f268-4639-4471-9093-e201a66d0513",
  type: "page-type/agent-message",
  slug: "message-e201a66d0513",
  to: "seat/alan",
  from: "telnyx-sms",
  warrant: "announce",
  body: "inbound-sms probe from amy: the write path works once the page type is named agent-message",
} as const satisfies AgentMessage
