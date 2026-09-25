import type { AgentMessage } from "akasha/agent/message/agent-message.page-type.types.ts"

export const message1cad52640a03 = {
  id: "01a0dac1-270a-7493-b8f6-1cad52640a03",
  type: "page-type/agent-message",
  slug: "message-1cad52640a03",
  to: "seat/alan",
  from: "telnyx-sms",
  warrant: "announce",
  body: "📱 SMS from +16085122510\n\nJen (no Pod)\n\n— inbound SMS channel · routed to alan (allowlisted sms identity → alan)\nacting for account 01a053fe-00ef-7d9b-9231-0340262cf86e",
} as const satisfies AgentMessage
