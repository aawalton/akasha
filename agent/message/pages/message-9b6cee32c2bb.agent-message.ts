import type { AgentMessage } from "akasha/agent/message/agent-message.page-type.types.ts"

export const message9b6cee32c2bb = {
  id: "01a0e547-1c46-7000-9a8f-9b6cee32c2bb",
  type: "page-type/agent-message",
  slug: "message-9b6cee32c2bb",
  to: "seat/mari-writer-the-dating-game",
  from: "story-turn",
  warrant: "announce",
  body: "The turn `story/world/pages/personas/stories/played/the-dating-game/turns/the-dating-game-00-027.story-turn-played.ts` is at writer.\n\nThe lore in play on the turn is on `story/world/pages/personas/lore/the-dating-game-alan.lore.ts`, `story/world/pages/personas/lore/the-dating-game-grace.lore.ts`. Read each of those pages whole first, since any of them can settle what the turn may say.\n",
} as const satisfies AgentMessage
