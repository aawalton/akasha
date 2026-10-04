import type { AgentMessage } from "akasha/agent/message/agent-message.page-type.types.ts"

export const message1fb17b7ac408 = {
  id: "01a104a6-0bf8-7000-a27c-1fb17b7ac408",
  type: "page-type/agent-message",
  slug: "message-1fb17b7ac408",
  to: "seat/mari-game-master-fairweather",
  from: "story-step",
  warrant: "announce",
  body: "The chapter `story/world/pages/fairweather/stories/written/fairweather/chapters/fairweather-0003-a-goat-lantern.story-chapter-written.ts` is at reviewers.\n\nThe game master has the final say, and ruled out 1 issue in `story/world/pages/fairweather/stories/written/fairweather/chapters/fairweather-0003-a-goat-lantern.story-chapter-written.rulings.jsonl`, each a json line naming the issue and the reason: a ruled-out issue is ended.\n",
} as const satisfies AgentMessage
