import type { AgentMessage } from "akasha/agent/message/agent-message.page-type.types.ts"

export const message1b3d2df19fbd = {
  id: "01a0e38b-1337-7000-9c3d-1b3d2df19fbd",
  type: "page-type/agent-message",
  slug: "message-1b3d2df19fbd",
  to: "seat/mari-world-builder-the-dating-game",
  from: "story-turn",
  warrant: "announce",
  body: "The turn `story/world/pages/personas/stories/played/the-dating-game/turns/the-dating-game-00-018.story-turn-played.ts` is at game-master.\n\nThese lore pages have changed since you last read them:\n- `story/world/pages/personas/lore/the-dating-game-echo.lore.ts`\n- `story/world/pages/personas/places/the-dating-game-rock-canyon.place.ts`\n",
} as const satisfies AgentMessage
