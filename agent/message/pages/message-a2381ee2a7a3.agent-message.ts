import type { AgentMessage } from "akasha/agent/message/agent-message.page-type.types.ts"

export const messageA2381ee2a7a3 = {
  id: "01a10712-9106-7000-ad61-a2381ee2a7a3",
  type: "page-type/agent-message",
  slug: "message-a2381ee2a7a3",
  to: "seat/mari-writer-fairweather",
  from: "story-step",
  warrant: "announce",
  body: "The chapter `story/world/pages/fairweather/stories/written/fairweather/chapters/fairweather-0006.story-chapter-written.ts` is at mechanics.\n\nThe game master has the final say, and ruled out 4 issues in `story/world/pages/fairweather/stories/written/fairweather/chapters/fairweather-0006.story-chapter-written.rulings.jsonl`, each a json line naming the issue and the reason: a ruled-out issue is ended.\n\nThese lore pages have changed since you last read them:\n- `story/world/pages/fairweather/lore/fairweather-tamsin.lore.ts`\n",
} as const satisfies AgentMessage
