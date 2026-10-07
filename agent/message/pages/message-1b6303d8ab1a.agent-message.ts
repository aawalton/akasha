import type { AgentMessage } from "akasha/agent/message/agent-message.page-type.types.ts"

export const message1b6303d8ab1a = {
  id: "01a113f9-15f5-7000-b243-1b6303d8ab1a",
  type: "page-type/agent-message",
  slug: "message-1b6303d8ab1a",
  to: "seat/mari-game-master-encounters",
  from: "story-step",
  warrant: "announce",
  body: "The chapter `story/world/pages/encounters/stories/written/encounters/chapters/encounters-0011.story-chapter-written.ts` is at game-master.\n\nThese lore pages have changed since you last read them:\n- `story/world/pages/encounters/lore/encounters-hana-2.lore.ts`\n- `story/world/pages/encounters/lore/encounters-kenzie-2.lore.ts`\n- `story/world/pages/encounters/lore/encounters-sofia-2.lore.ts`\n",
} as const satisfies AgentMessage
