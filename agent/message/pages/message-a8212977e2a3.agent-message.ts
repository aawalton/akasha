import type { AgentMessage } from "akasha/agent/message/agent-message.page-type.types.ts"

export const messageA8212977e2a3 = {
  id: "01a1074d-11af-7000-b916-a8212977e2a3",
  type: "page-type/agent-message",
  slug: "message-a8212977e2a3",
  to: "seat/mari-writer-fairweather",
  from: "story-step",
  warrant: "announce",
  body: "The chapter `story/world/pages/fairweather/stories/written/fairweather/chapters/fairweather-0006-the-marigold.story-chapter-written.ts` is at reviewers.\n\nThe game master has the final say, and ruled out 4 issues in `story/world/pages/fairweather/stories/written/fairweather/chapters/fairweather-0006-the-marigold.story-chapter-written.rulings.jsonl`, each a json line naming the issue and the reason: a ruled-out issue is ended.\n",
} as const satisfies AgentMessage
