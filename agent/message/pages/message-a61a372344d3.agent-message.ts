import type { AgentMessage } from "akasha/agent/message/agent-message.page-type.types.ts"

export const messageA61a372344d3 = {
  id: "01a1061b-c5d8-7000-bff9-a61a372344d3",
  type: "page-type/agent-message",
  slug: "message-a61a372344d3",
  to: "seat/mari-world-builder-fairweather",
  from: "story-step",
  warrant: "announce",
  body: "The chapter `story/world/pages/fairweather/stories/written/fairweather/chapters/fairweather-0004.story-chapter-written.ts` is at mechanics.\n\nThe game master has the final say, and ruled out 1 issue in `story/world/pages/fairweather/stories/written/fairweather/chapters/fairweather-0004.story-chapter-written.rulings.jsonl`, each a json line naming the issue and the reason: a ruled-out issue is ended.\n",
} as const satisfies AgentMessage
