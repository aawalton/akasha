import type { AgentMessage } from "akasha/agent/message/agent-message.page-type.types.ts"

export const message1fbfae97dcff = {
  id: "01a0e3c5-ea4a-7000-8c0a-1fbfae97dcff",
  type: "page-type/agent-message",
  slug: "message-1fbfae97dcff",
  to: "seat/mari-world-builder-the-dating-game",
  from: "story-turn",
  warrant: "announce",
  body: "The turn `story/world/pages/personas/stories/played/the-dating-game/turns/the-dating-game-00-021.story-turn-played.ts` is at writer.\n\nThese lore pages have changed since you last read them:\n- `story/world/pages/personas/lore/the-dating-game-echo.lore.ts`\n- `story/world/pages/personas/places/the-dating-game-rock-canyon.place.ts`\n\nThe lore about the turn's characters is on `story/world/pages/personas/lore/the-dating-game-alan.lore.ts`, `story/world/pages/personas/lore/the-dating-game-boulder-woman.lore.ts`, `story/world/pages/personas/lore/the-dating-game-echo.lore.ts`. Read each of those pages whole first, since any of them can settle what the turn may say.\n",
} as const satisfies AgentMessage
