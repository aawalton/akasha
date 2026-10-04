import type { AgentMessage } from "akasha/agent/message/agent-message.page-type.types.ts"

export const messageF4e4afbf66b2 = {
  id: "01a10756-b6b8-7000-bd97-f4e4afbf66b2",
  type: "page-type/agent-message",
  slug: "message-f4e4afbf66b2",
  to: "seat/mari-writer-fairweather",
  from: "story-step",
  warrant: "announce",
  body: "The chapter `story/world/pages/fairweather/stories/written/fairweather/chapters/fairweather-0006-the-marigold.story-chapter-written.ts` is at game-master.\n\nThis chapter came back for repair, not to be made again: mend each fault where it lands and keep the rest as it is. The faults are in the file beside it:\n- `story/world/pages/fairweather/stories/written/fairweather/chapters/fairweather-0006-the-marigold.story-chapter-written.issues.txt`, listing 1 fault\nThe game master has the final say, and ruled out 4 issues in `story/world/pages/fairweather/stories/written/fairweather/chapters/fairweather-0006-the-marigold.story-chapter-written.rulings.jsonl`, each a json line naming the issue and the reason: a ruled-out issue is ended.\n",
} as const satisfies AgentMessage
