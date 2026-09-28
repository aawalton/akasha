import type { AgentMessage } from "akasha/agent/message/agent-message.page-type.types.ts"

export const message1ab906c3677d = {
  id: "01a0e801-77d3-7000-9942-1ab906c3677d",
  type: "page-type/agent-message",
  slug: "message-1ab906c3677d",
  to: "seat/mari-writer-the-dating-game",
  from: "story-turn",
  warrant: "announce",
  body: "The turn `story/world/pages/personas/stories/played/the-dating-game/turns/the-dating-game-00-040.story-turn-played.ts` is at player.\n\nThese lore pages have changed since you last read them:\n- `story/world/pages/personas/lore/the-dating-game-aelwyn.lore.ts`\n",
} as const satisfies AgentMessage
