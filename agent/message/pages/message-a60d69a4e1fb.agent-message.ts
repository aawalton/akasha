import type { AgentMessage } from "akasha/agent/message/agent-message.page-type.types.ts"

export const messageA60d69a4e1fb = {
  id: "01a0e3d0-06e7-7000-aca9-a60d69a4e1fb",
  type: "page-type/agent-message",
  slug: "message-a60d69a4e1fb",
  to: "seat/mari-game-master-the-dating-game",
  from: "story-turn",
  warrant: "announce",
  body: "The turn `story/world/pages/personas/stories/played/the-dating-game/turns/the-dating-game-00-022.story-turn-played.ts` is at writer.\n\nThe lore about the turn's characters is on `story/world/pages/personas/lore/the-dating-game-alan.lore.ts`, `story/world/pages/personas/lore/the-dating-game-boulder-woman.lore.ts`, `story/world/pages/personas/lore/the-dating-game-echo.lore.ts`. Read each of those pages whole first, since any of them can settle what the turn may say.\n",
} as const satisfies AgentMessage
