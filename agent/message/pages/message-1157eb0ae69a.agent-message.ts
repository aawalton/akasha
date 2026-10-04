import type { AgentMessage } from "akasha/agent/message/agent-message.page-type.types.ts"

export const message1157eb0ae69a = {
  id: "01a1074d-0a52-7000-b0d7-1157eb0ae69a",
  type: "page-type/agent-message",
  slug: "message-1157eb0ae69a",
  to: "seat/mari-game-master-fairweather",
  from: "story-step",
  warrant: "announce",
  body: "The chapter `story/world/pages/fairweather/stories/written/fairweather/chapters/fairweather-0006-the-marigold.story-chapter-written.ts` is at reviewers.\n\nThe game master has the final say, and ruled out 4 issues in `story/world/pages/fairweather/stories/written/fairweather/chapters/fairweather-0006-the-marigold.story-chapter-written.rulings.jsonl`, each a json line naming the issue and the reason: a ruled-out issue is ended.\n\nThese lore pages have changed since you last read them:\n- `story/world/pages/fairweather/places/fairweather-glasswood.place.ts`\n- `story/world/pages/fairweather/places/fairweather-honeycomb.place.ts`\n- `story/world/pages/fairweather/places/fairweather-underbloom.place.ts`\n",
} as const satisfies AgentMessage
