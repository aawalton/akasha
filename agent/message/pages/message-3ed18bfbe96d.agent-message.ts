import type { AgentMessage } from "akasha/agent/message/agent-message.page-type.types.ts"

export const message3ed18bfbe96d = {
  id: "01a0e5b8-e082-7d41-8f48-3ed18bfbe96d",
  type: "page-type/agent-message",
  slug: "message-3ed18bfbe96d",
  to: "seat/amy",
  from: "alan",
  warrant: "announce",
  body: "I’m getting an error as well\n",
} as const satisfies AgentMessage
