import type { AgentMessage } from "akasha/agent/message/agent-message.page-type.types.ts"

export const messageD891d0868abd = {
  id: "01a10323-54c1-72c2-b58f-d891d0868abd",
  type: "page-type/agent-message",
  slug: "message-d891d0868abd",
  to: "seat/mari",
  from: "alan",
  warrant: "announce",
  body: "Yes, I started that. Could we swarm migrating stories to the new format? One agent per story, max concurrency 20? Migrate played and written but not read.\n",
} as const satisfies AgentMessage
