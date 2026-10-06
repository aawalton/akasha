import type { AgentMessage } from "akasha/agent/message/agent-message.page-type.types.ts"

export const messageBfd462d2fbea = {
  id: "01a1133e-738b-7000-9b11-bfd462d2fbea",
  type: "page-type/agent-message",
  slug: "message-bfd462d2fbea",
  to: "seat/mari-game-master-fairweather",
  from: "story-step",
  warrant: "announce",
  body: "The chapter `story/world/pages/fairweather/stories/written/fairweather/chapters/fairweather-0019-ring-first.story-chapter-written.ts` is at game-master.\n\nThis chapter came back for repair, not to be made again: mend each fault where it lands and keep the rest as it is. The faults are in the files beside it:\n- `story/world/pages/fairweather/stories/written/fairweather/chapters/fairweather-0019-ring-first.story-chapter-written.issues.txt`, listing 8 faults\n- `story/world/pages/fairweather/stories/written/fairweather/chapters/fairweather-0019-ring-first.story-chapter-written.mechanics-issues.txt`, listing 2 faults\nThe game master has the final say, and ruled out 1 issue in `story/world/pages/fairweather/stories/written/fairweather/chapters/fairweather-0019-ring-first.story-chapter-written.rulings.jsonl`, each a json line naming the issue and the reason: a ruled-out issue is ended.\n",
} as const satisfies AgentMessage
