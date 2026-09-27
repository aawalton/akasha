import type { AgentMessage } from "akasha/agent/message/agent-message.page-type.types.ts"

export const message20b85a3ae1fa = {
  id: "01a0e54d-84f3-7000-aba7-20b85a3ae1fa",
  type: "page-type/agent-message",
  slug: "message-20b85a3ae1fa",
  to: "seat/mari-writer-the-dating-game",
  from: "story-turn",
  warrant: "announce",
  body: "The turn `story/world/pages/personas/stories/played/the-dating-game/turns/the-dating-game-00-028.story-turn-played.ts` is at writer.\n\nThe lore in play on the turn is on `story/world/pages/personas/lore/the-dating-game-alan.lore.ts`, `story/world/pages/personas/lore/the-dating-game-grace.lore.ts`, `story/world/pages/personas/places/the-dating-game-provo-city-cemetery.place.ts`. Read each of those pages whole first, since any of them can settle what the turn may say.\n",
} as const satisfies AgentMessage
