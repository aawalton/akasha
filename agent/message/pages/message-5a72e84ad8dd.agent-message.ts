import type { AgentMessage } from "akasha/agent/message/agent-message.page-type.types.ts"

export const message5a72e84ad8dd = {
  id: "01a0e80e-25cb-7000-b84e-5a72e84ad8dd",
  type: "page-type/agent-message",
  slug: "message-5a72e84ad8dd",
  to: "seat/mari-writer-the-dating-game",
  from: "story-turn",
  warrant: "announce",
  body: "The turn `story/world/pages/personas/stories/played/the-dating-game/turns/the-dating-game-00-042.story-turn-played.ts` is at game-master.\n\nThese lore pages have changed since you last read them:\n- `story/world/pages/personas/lore/the-dating-game-aelwyn.lore.ts`\n- `story/world/pages/personas/places/the-dating-game-rock-canyon.place.ts`\n",
} as const satisfies AgentMessage
