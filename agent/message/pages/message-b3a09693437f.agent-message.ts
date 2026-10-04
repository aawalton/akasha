import type { AgentMessage } from "akasha/agent/message/agent-message.page-type.types.ts"

export const messageB3a09693437f = {
  id: "01a108ef-b71a-7fb0-a0d6-b3a09693437f",
  type: "page-type/agent-message",
  slug: "message-b3a09693437f",
  to: "seat/mari",
  from: "alan",
  warrant: "announce",
  body: "Okay, I have the album open, no need to post inline anymore\n",
} as const satisfies AgentMessage
