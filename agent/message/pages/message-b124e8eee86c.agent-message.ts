import type { AgentMessage } from "akasha/agent/message/agent-message.page-type.types.ts"

export const messageB124e8eee86c = {
  id: "01a0e597-ef18-7000-8a1a-b124e8eee86c",
  type: "page-type/agent-message",
  slug: "message-b124e8eee86c",
  to: "seat/mari-writer-the-dating-game",
  from: "story-turn",
  warrant: "announce",
  body: "The turn `story/world/pages/personas/stories/played/the-dating-game/turns/the-dating-game-00-038.story-turn-played.ts` is at writer.\n\nThe lore in play on the turn is on `story/world/pages/personas/lore/the-dating-game-alan.lore.ts`, `story/world/pages/personas/lore/the-dating-game-grace.lore.ts`. Read each of those pages whole first, since any of them can settle what the turn may say.\n",
} as const satisfies AgentMessage
