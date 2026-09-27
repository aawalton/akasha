import type { AgentMessage } from "akasha/agent/message/agent-message.page-type.types.ts"

export const message0345a008eabe = {
  id: "01a0e54b-b029-7000-a10c-0345a008eabe",
  type: "page-type/agent-message",
  slug: "message-0345a008eabe",
  to: "seat/mari-writer-the-dating-game",
  from: "story-turn",
  warrant: "announce",
  body: "The turn `story/world/pages/personas/stories/played/the-dating-game/turns/the-dating-game-00-028.story-turn-played.ts` is at writer.\n\nThese lore pages have changed since you last read them:\n- `story/world/pages/personas/lore/the-dating-game-grace.lore.ts`\n\nThe lore in play on the turn is on `story/world/pages/personas/lore/the-dating-game-grace.lore.ts`, `story/world/pages/personas/places/the-dating-game-provo-city-cemetery.place.ts`. Read each of those pages whole first, since any of them can settle what the turn may say.\n",
} as const satisfies AgentMessage
