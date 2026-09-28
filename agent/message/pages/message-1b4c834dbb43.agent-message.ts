import type { AgentMessage } from "akasha/agent/message/agent-message.page-type.types.ts"

export const message1b4c834dbb43 = {
  id: "01a0e568-1472-7000-8ff1-1b4c834dbb43",
  type: "page-type/agent-message",
  slug: "message-1b4c834dbb43",
  to: "seat/mari-writer-the-dating-game",
  from: "story-turn",
  warrant: "announce",
  body: "The turn `story/world/pages/personas/stories/played/the-dating-game/turns/the-dating-game-00-031.story-turn-played.ts` is at writer.\n\nThe lore in play on the turn is on `story/world/pages/personas/lore/the-dating-game-alan.lore.ts`, `story/world/pages/personas/lore/the-dating-game-grace.lore.ts`. Read each of those pages whole first, since any of them can settle what the turn may say.\n",
} as const satisfies AgentMessage
