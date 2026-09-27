import type { AgentMessage } from "akasha/agent/message/agent-message.page-type.types.ts"

export const messageFa002d479fa1 = {
  id: "01a0e36b-e3b5-7000-b02d-fa002d479fa1",
  type: "page-type/agent-message",
  slug: "message-fa002d479fa1",
  to: "seat/mari-writer-the-dating-game",
  from: "story-turn",
  warrant: "announce",
  body: "The turn `story/world/pages/personas/stories/played/the-dating-game/turns/the-dating-game-00-015.story-turn-played.ts` is at writer.\n\nThese lore pages have changed since you last read them:\n- `story/world/pages/personas/lore/the-dating-game-echo.lore.ts`\n\nThe lore about the turn's characters is on `story/world/pages/personas/lore/the-dating-game-alan.lore.ts`, `story/world/pages/personas/lore/the-dating-game-boulder-woman.lore.ts`, `story/world/pages/personas/lore/the-dating-game-echo.lore.ts`. Read each of those pages whole first, since any of them can settle what the turn may say.\n",
} as const satisfies AgentMessage
