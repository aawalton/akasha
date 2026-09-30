import type { AgentMessage } from "akasha/agent/message/agent-message.page-type.types.ts"

export const message4fe581097b69 = {
  id: "01a0f1c3-36b6-7ec8-b16e-4fe581097b69",
  type: "page-type/agent-message",
  slug: "message-4fe581097b69",
  to: "seat/iris",
  from: "alan",
  warrant: "announce",
  body: "I need a way to cancel a turn from the UI, and that should put my action back in the box\n",
} as const satisfies AgentMessage
