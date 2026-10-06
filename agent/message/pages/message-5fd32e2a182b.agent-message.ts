import type { AgentMessage } from "akasha/agent/message/agent-message.page-type.types.ts"

export const message5fd32e2a182b = {
  id: "01a112f3-a4c5-722d-b422-5fd32e2a182b",
  type: "page-type/agent-message",
  slug: "message-5fd32e2a182b",
  to: "seat/alan",
  from: "telnyx-sms",
  warrant: "announce",
  body: "📱 SMS from +16085122510\n\n4:40 Read\n\n— inbound SMS channel · routed to alan (allowlisted sms identity → alan)\nacting for account 01a053fe-00ef-7d9b-9231-0340262cf86e",
} as const satisfies AgentMessage
