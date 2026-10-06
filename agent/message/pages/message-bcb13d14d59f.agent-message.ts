import type { AgentMessage } from "akasha/agent/message/agent-message.page-type.types.ts"

export const messageBcb13d14d59f = {
  id: "01a1115c-eef6-7000-bbcd-bcb13d14d59f",
  type: "page-type/agent-message",
  slug: "message-bcb13d14d59f",
  to: "seat/mari-world-builder-fairweather",
  from: "story-step",
  warrant: "announce",
  body: "The chapter `story/world/pages/fairweather/stories/written/fairweather/chapters/fairweather-0012-fish-gone.story-chapter-written.ts` is at mechanics.\n\nThis chapter came back for repair, not to be made again: mend each fault where it lands and keep the rest as it is. The faults are in the file beside it:\n- `story/world/pages/fairweather/stories/written/fairweather/chapters/fairweather-0012-fish-gone.story-chapter-written.issues.txt`, listing 2 faults\nThe game master has the final say, and ruled out 1 issue in `story/world/pages/fairweather/stories/written/fairweather/chapters/fairweather-0012-fish-gone.story-chapter-written.rulings.jsonl`, each a json line naming the issue and the reason: a ruled-out issue is ended.\n",
} as const satisfies AgentMessage
