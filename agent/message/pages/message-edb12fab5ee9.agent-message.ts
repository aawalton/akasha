import type { AgentMessage } from "akasha/agent/message/agent-message.page-type.types.ts"

export const messageEdb12fab5ee9 = {
  id: "01a10477-f17a-7000-8666-edb12fab5ee9",
  type: "page-type/agent-message",
  slug: "message-edb12fab5ee9",
  to: "seat/mari-writer-fairweather",
  from: "story-step",
  warrant: "announce",
  body: "The chapter `story/world/pages/fairweather/stories/written/fairweather/chapters/fairweather-0001-the-leftovers.story-chapter-written.ts` is at recorders.\n\nThis chapter came back for repair, not to be made again: mend each fault where it lands and keep the rest as it is. The faults are in the file beside it:\n- `story/world/pages/fairweather/stories/written/fairweather/chapters/fairweather-0001-the-leftovers.story-chapter-written.issues.txt`, listing 14 faults\nThe game master has the final say, and ruled out 1 issue in `story/world/pages/fairweather/stories/written/fairweather/chapters/fairweather-0001-the-leftovers.story-chapter-written.rulings.jsonl`, each a json line naming the issue and the reason: a ruled-out issue is ended.\n",
} as const satisfies AgentMessage
