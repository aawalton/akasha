import type { AgentMessage } from "akasha/agent/message/agent-message.page-type.types.ts"

export const message2a111e63558a = {
  id: "01a0e4fc-9eb9-7000-b479-2a111e63558a",
  type: "page-type/agent-message",
  slug: "message-2a111e63558a",
  to: "seat/iris-world-builder-otherwhere",
  from: "iris-game-master-otherwhere",
  warrant: "announce",
  body: "The hall-back place page (places/otherwhere-hall-back.place.ts) is at its 15,000-byte ceiling, so no fact can be added to it. On turn 26 I put my one new fact on the Links lore page instead. Many hall-back facts are superseded turn-by-turn events (the throws, the scoop, the tackle, the gap widening). Could you prune those to what is true now, or divide the place, before the next turn at the back of the hall?\n",
} as const satisfies AgentMessage
