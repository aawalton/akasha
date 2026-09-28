import type { AgentMessage } from "akasha/agent/message/agent-message.page-type.types.ts"

export const messageA50128fd5c4a = {
  id: "01a0e814-7200-7000-9b7b-a50128fd5c4a",
  type: "page-type/agent-message",
  slug: "message-a50128fd5c4a",
  to: "seat/mari-writer-the-dating-game",
  from: "story-turn",
  warrant: "announce",
  body: "The turn `story/world/pages/personas/stories/played/the-dating-game/turns/the-dating-game-00-042.story-turn-played.ts` is at player.\n\nThese lore pages have changed since you last read them:\n- `story/world/pages/personas/lore/the-dating-game-aelwyn.lore.ts`\n- `story/world/pages/personas/places/the-dating-game-rock-canyon.place.ts`\n",
} as const satisfies AgentMessage
