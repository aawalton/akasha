import type { AgentMessage } from "akasha/agent/message/agent-message.page-type.types.ts"

export const message5c01e5897295 = {
  id: "01a0e7bd-0fb5-7000-bedb-5c01e5897295",
  type: "page-type/agent-message",
  slug: "message-5c01e5897295",
  to: "seat/mari-game-master-the-dating-game",
  from: "story-turn",
  warrant: "announce",
  body: "The turn `story/world/pages/personas/stories/played/the-dating-game/turns/the-dating-game-00-040.story-turn-played.ts` is at writer.\n\nThe lore in play on the turn is on `story/world/pages/personas/lore/the-dating-game-alan.lore.ts`, `story/world/pages/personas/places/the-dating-game-provo-recreation-center.place.ts`. Read each of those pages whole first, since any of them can settle what the turn may say.\n",
} as const satisfies AgentMessage
