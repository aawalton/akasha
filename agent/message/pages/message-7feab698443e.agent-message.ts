import type { AgentMessage } from "akasha/agent/message/agent-message.page-type.types.ts"

export const message7feab698443e = {
  id: "01a10220-a298-7801-b595-7feab698443e",
  type: "page-type/agent-message",
  slug: "message-7feab698443e",
  to: "seat/mari",
  from: "alan",
  warrant: "announce",
  body: "I’d like to swap the order for reviewers and recorders. The recorders should record first and the reviewers should review the structured data as well, not just the prose\n",
} as const satisfies AgentMessage
