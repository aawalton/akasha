import type { AgentMessage } from "akasha/agent/message/agent-message.page-type.types.ts"

export const messageF9ed3ff9f5fb = {
  id: "01a0e571-122d-7000-a6c4-f9ed3ff9f5fb",
  type: "page-type/agent-message",
  slug: "message-f9ed3ff9f5fb",
  to: "seat/mari-writer-the-dating-game",
  from: "story-turn",
  warrant: "announce",
  body: "The turn `story/world/pages/personas/stories/played/the-dating-game/turns/the-dating-game-00-032.story-turn-played.ts` is at writer.\n\nThe lore in play on the turn is on `story/world/pages/personas/lore/the-dating-game-alan.lore.ts`, `story/world/pages/personas/lore/the-dating-game-grace.lore.ts`. Read each of those pages whole first, since any of them can settle what the turn may say.\n",
} as const satisfies AgentMessage
