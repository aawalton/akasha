import type { AgentMessage } from "akasha/agent/message/agent-message.page-type.types.ts"

export const messageE3f3ceb77b7c = {
  id: "01a1074d-0d0a-7000-aee5-e3f3ceb77b7c",
  type: "page-type/agent-message",
  slug: "message-e3f3ceb77b7c",
  to: "seat/mari-world-builder-fairweather",
  from: "story-step",
  warrant: "announce",
  body: "The chapter `story/world/pages/fairweather/stories/written/fairweather/chapters/fairweather-0006-the-marigold.story-chapter-written.ts` is at reviewers.\n\nThe game master has the final say, and ruled out 4 issues in `story/world/pages/fairweather/stories/written/fairweather/chapters/fairweather-0006-the-marigold.story-chapter-written.rulings.jsonl`, each a json line naming the issue and the reason: a ruled-out issue is ended.\n",
} as const satisfies AgentMessage
