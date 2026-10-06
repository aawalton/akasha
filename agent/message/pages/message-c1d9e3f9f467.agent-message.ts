import type { AgentMessage } from "akasha/agent/message/agent-message.page-type.types.ts"

export const messageC1d9e3f9f467 = {
  id: "01a1119e-fd35-7000-ab25-c1d9e3f9f467",
  type: "page-type/agent-message",
  slug: "message-c1d9e3f9f467",
  to: "seat/mari-game-master-fairweather",
  from: "story-step",
  warrant: "announce",
  body: "The chapter `story/world/pages/fairweather/stories/written/fairweather/chapters/fairweather-0013-grey-wool.story-chapter-written.ts` is at game-master.\n\nThis chapter came back for repair, not to be made again: mend each fault where it lands and keep the rest as it is. The faults are in the file beside it:\n- `story/world/pages/fairweather/stories/written/fairweather/chapters/fairweather-0013-grey-wool.story-chapter-written.issues.txt`, listing 1 fault\nThe game master has the final say, and ruled out 5 issues in `story/world/pages/fairweather/stories/written/fairweather/chapters/fairweather-0013-grey-wool.story-chapter-written.rulings.jsonl`, each a json line naming the issue and the reason: a ruled-out issue is ended.\n",
} as const satisfies AgentMessage
