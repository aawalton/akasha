import type { AgentMessage } from "akasha/agent/message/agent-message.page-type.types.ts"

export const messageA17b44559eb4 = {
  id: "01a10629-792f-7000-977b-a17b44559eb4",
  type: "page-type/agent-message",
  slug: "message-a17b44559eb4",
  to: "seat/mari-world-builder-fairweather",
  from: "story-step",
  warrant: "announce",
  body: "The chapter `story/world/pages/fairweather/stories/written/fairweather/chapters/fairweather-0004-leave-it.story-chapter-written.ts` is at mechanics.\n\nThis chapter came back for repair, not to be made again: mend each fault where it lands and keep the rest as it is. The faults are in the file beside it:\n- `story/world/pages/fairweather/stories/written/fairweather/chapters/fairweather-0004-leave-it.story-chapter-written.issues.txt`, listing 6 faults\nThe game master has the final say, and ruled out 1 issue in `story/world/pages/fairweather/stories/written/fairweather/chapters/fairweather-0004-leave-it.story-chapter-written.rulings.jsonl`, each a json line naming the issue and the reason: a ruled-out issue is ended.\n",
} as const satisfies AgentMessage
