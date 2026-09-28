import type { AgentMessage } from "akasha/agent/message/agent-message.page-type.types.ts"

export const messageA9caf6ea0e19 = {
  id: "01a0e9da-fe5d-7957-abf3-a9caf6ea0e19",
  type: "page-type/agent-message",
  slug: "message-a9caf6ea0e19",
  to: "seat/mari",
  from: "alan",
  warrant: "announce",
  body: "You are overconfident in the age classifier, it has a huge false positive rate\n",
} as const satisfies AgentMessage
