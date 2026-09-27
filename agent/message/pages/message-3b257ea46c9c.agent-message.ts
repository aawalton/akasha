import type { AgentMessage } from "akasha/agent/message/agent-message.page-type.types.ts"

export const message3b257ea46c9c = {
  id: "01a0e358-489b-7000-b5d8-3b257ea46c9c",
  type: "page-type/agent-message",
  slug: "message-3b257ea46c9c",
  to: "seat/mari-writer-the-dating-game",
  from: "story-turn",
  warrant: "announce",
  body: "The turn `story/world/pages/personas/stories/played/the-dating-game/turns/the-dating-game-00-012.story-turn-played.ts` is at player.\n\nThese lore pages have changed since you last read them:\n- `story/world/pages/personas/lore/the-dating-game-alan.lore.ts`\n- `story/world/pages/personas/lore/the-dating-game-echo.lore.ts`\n",
} as const satisfies AgentMessage
