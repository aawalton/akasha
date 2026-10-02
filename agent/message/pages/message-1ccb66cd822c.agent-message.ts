import type { AgentMessage } from "akasha/agent/message/agent-message.page-type.types.ts"

export const message1ccb66cd822c = {
  id: "01a0fdf5-633d-7429-ba6c-1ccb66cd822c",
  type: "page-type/agent-message",
  slug: "message-1ccb66cd822c",
  to: "seat/iris",
  from: "alan",
  warrant: "announce",
  body: "It looks like there is another one that auto-scrolls to get the full image in view, can we turn that off?\n",
} as const satisfies AgentMessage
