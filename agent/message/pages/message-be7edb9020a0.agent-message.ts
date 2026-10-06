import type { AgentMessage } from "akasha/agent/message/agent-message.page-type.types.ts"

export const messageBe7edb9020a0 = {
  id: "01a1119e-b4ea-7f93-9982-be7edb9020a0",
  type: "page-type/agent-message",
  slug: "message-be7edb9020a0",
  to: "seat/nimue",
  from: "alan",
  warrant: "announce",
  body: "Another small issue, scene separators like “——“ are getting pronounced in the narration, need a bit better pre-processing to strip elements that shouldn’t be pronounced.\n",
} as const satisfies AgentMessage
