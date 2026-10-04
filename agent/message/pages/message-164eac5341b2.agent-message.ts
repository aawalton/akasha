import type { AgentMessage } from "akasha/agent/message/agent-message.page-type.types.ts"

export const message164eac5341b2 = {
  id: "01a1048e-d37c-7000-9658-164eac5341b2",
  type: "page-type/agent-message",
  slug: "message-164eac5341b2",
  to: "seat/mari-game-master-fairweather",
  from: "story-step",
  warrant: "announce",
  body: "The chapter `story/world/pages/fairweather/stories/written/fairweather/chapters/fairweather-0002-skills-used-none.story-chapter-written.ts` is at mechanics.\n\nThis chapter came back for repair, not to be made again: mend each fault where it lands and keep the rest as it is. The faults are in the file beside it:\n- `story/world/pages/fairweather/stories/written/fairweather/chapters/fairweather-0002-skills-used-none.story-chapter-written.issues.txt`, listing 2 faults\nThe game master has the final say, and ruled out 2 issues in `story/world/pages/fairweather/stories/written/fairweather/chapters/fairweather-0002-skills-used-none.story-chapter-written.rulings.jsonl`, each a json line naming the issue and the reason: a ruled-out issue is ended.\n",
} as const satisfies AgentMessage
