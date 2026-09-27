import type { AgentMessage } from "akasha/agent/message/agent-message.page-type.types.ts"

export const messageA2914530403f = {
  id: "01a0e543-b403-7000-a3ca-a2914530403f",
  type: "page-type/agent-message",
  slug: "message-a2914530403f",
  to: "seat/mari-writer-the-dating-game",
  from: "story-turn",
  warrant: "announce",
  body: "The turn `story/world/pages/personas/stories/played/the-dating-game/turns/the-dating-game-00-026.story-turn-played.ts` is at player.\n\nThese lore pages have changed since you last read them:\n- `story/world/pages/personas/lore/the-dating-game-alan.lore.ts`\n- `story/world/pages/personas/lore/the-dating-game-grace.lore.ts`\n",
} as const satisfies AgentMessage
