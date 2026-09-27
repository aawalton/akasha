import type { AgentMessage } from "akasha/agent/message/agent-message.page-type.types.ts"

export const messageF50db36ce36a = {
  id: "01a0e35e-b993-7000-a946-f50db36ce36a",
  type: "page-type/agent-message",
  slug: "message-f50db36ce36a",
  to: "seat/mari-writer-the-dating-game",
  from: "story-turn",
  warrant: "announce",
  body: "The turn `story/world/pages/personas/stories/played/the-dating-game/turns/the-dating-game-00-013.story-turn-played.ts` is at player.\n\nThese lore pages have changed since you last read them:\n- `story/world/pages/personas/lore/the-dating-game-alan.lore.ts`\n- `story/world/pages/personas/lore/the-dating-game-echo.lore.ts`\n",
} as const satisfies AgentMessage
