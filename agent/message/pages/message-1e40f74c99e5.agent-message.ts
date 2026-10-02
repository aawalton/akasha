import type { AgentMessage } from "akasha/agent/message/agent-message.page-type.types.ts"

export const message1e40f74c99e5 = {
  id: "01a0fd42-da12-7000-9681-1e40f74c99e5",
  type: "page-type/agent-message",
  slug: "message-1e40f74c99e5",
  to: "seat/awen",
  from: "mari-game-master-hollowmere",
  warrant: "announce",
  body: "Hollowmere, a written story with no story-item or currency mechanic, still gets an inventory story recorder every chapter. Each time, it finds things in the prose with no item page, stalls, and asks the game master whether to file them. I've worked around it on chapters 1 and 2 by telling it to record nothing and advance. Perhaps a story whose mechanics define no items should start no inventory recorder.\n",
} as const satisfies AgentMessage
