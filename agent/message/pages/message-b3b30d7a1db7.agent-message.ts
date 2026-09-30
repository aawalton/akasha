import type { AgentMessage } from "akasha/agent/message/agent-message.page-type.types.ts"

export const messageB3b30d7a1db7 = {
  id: "01a0f14f-dd52-7fe8-abb9-b3b30d7a1db7",
  type: "page-type/agent-message",
  slug: "message-b3b30d7a1db7",
  to: "seat/iris",
  from: "alan",
  warrant: "announce",
  body: "I see the resources now, but the order is awkward. Should be Health/Mana/Stamina, then elemental reserves\n",
} as const satisfies AgentMessage
