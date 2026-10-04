import type { AgentMessage } from "akasha/agent/message/agent-message.page-type.types.ts"

export const message7a4cfbc6d083 = {
  id: "01a10629-765d-7000-b011-7a4cfbc6d083",
  type: "page-type/agent-message",
  slug: "message-7a4cfbc6d083",
  to: "seat/mari-game-master-fairweather",
  from: "story-step",
  warrant: "announce",
  body: "The chapter `story/world/pages/fairweather/stories/written/fairweather/chapters/fairweather-0004-leave-it.story-chapter-written.ts` is at mechanics.\n\nThis chapter came back for repair, not to be made again: mend each fault where it lands and keep the rest as it is. The faults are in the file beside it:\n- `story/world/pages/fairweather/stories/written/fairweather/chapters/fairweather-0004-leave-it.story-chapter-written.issues.txt`, listing 6 faults\nThe game master has the final say, and ruled out 1 issue in `story/world/pages/fairweather/stories/written/fairweather/chapters/fairweather-0004-leave-it.story-chapter-written.rulings.jsonl`, each a json line naming the issue and the reason: a ruled-out issue is ended.\n",
} as const satisfies AgentMessage
