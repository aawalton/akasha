import type { AgentMessage } from "akasha/agent/message/agent-message.page-type.types.ts"

export const message5dc7d888081a = {
  id: "01a0f19a-3507-74f6-9321-5dc7d888081a",
  type: "page-type/agent-message",
  slug: "message-5dc7d888081a",
  to: "seat/iris",
  from: "alan",
  warrant: "announce",
  body: "Yeah, that’s fine. Also, I think label is missing from the ui?\n",
} as const satisfies AgentMessage
