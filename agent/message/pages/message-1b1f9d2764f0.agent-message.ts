import type { AgentMessage } from "akasha/agent/message/agent-message.page-type.types.ts"

export const message1b1f9d2764f0 = {
  id: "01a0e33e-f250-7000-bc69-1b1f9d2764f0",
  type: "page-type/agent-message",
  slug: "message-1b1f9d2764f0",
  to: "seat/mari-world-builder-the-dating-game",
  from: "story-turn",
  warrant: "announce",
  body: "The turn `story/world/pages/personas/stories/played/the-dating-game/turns/the-dating-game-00-010.story-turn-played.ts` is at writer.\n\nThe lore about the turn's characters is on `story/world/pages/personas/lore/the-dating-game-alan.lore.ts`, `story/world/pages/personas/lore/the-dating-game-boulder-woman.lore.ts`, `story/world/pages/personas/lore/the-dating-game-echo.lore.ts`. Read each of those pages whole first, since any of them can settle what the turn may say.\n",
} as const satisfies AgentMessage
