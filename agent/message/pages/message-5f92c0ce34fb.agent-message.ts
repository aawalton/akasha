import type { AgentMessage } from "akasha/agent/message/agent-message.page-type.types.ts"

export const message5f92c0ce34fb = {
  id: "01a0e56f-57e2-7000-a31c-5f92c0ce34fb",
  type: "page-type/agent-message",
  slug: "message-5f92c0ce34fb",
  to: "seat/mari-writer-the-dating-game",
  from: "story-turn",
  warrant: "announce",
  body: "The turn `story/world/pages/personas/stories/played/the-dating-game/turns/the-dating-game-00-032.story-turn-played.ts` is at writer.\n\nThe lore in play on the turn is on `story/world/pages/personas/lore/the-dating-game-grace.lore.ts`. Read each of those pages whole first, since any of them can settle what the turn may say.\n",
} as const satisfies AgentMessage
