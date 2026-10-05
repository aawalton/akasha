import type { AgentMessage } from "akasha/agent/message/agent-message.page-type.types.ts"

export const message7e5e38560b8c = {
  id: "01a10dfd-6dca-7f6e-86fb-7e5e38560b8c",
  type: "page-type/agent-message",
  slug: "message-7e5e38560b8c",
  to: "seat/nimue",
  from: "alan",
  warrant: "announce",
  body: "Okay, next issue is that the story pages for read stories list the chapters twice. They should keep the View version (second) and the view should be filtered to only show unread chapters by default\n",
} as const satisfies AgentMessage
