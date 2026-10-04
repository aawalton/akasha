import type { AgentMessage } from "akasha/agent/message/agent-message.page-type.types.ts"

export const messageB261dd4a9e6f = {
  id: "01a10491-7549-7000-9e3d-b261dd4a9e6f",
  type: "page-type/agent-message",
  slug: "message-b261dd4a9e6f",
  to: "seat/mari-game-master-fairweather",
  from: "story-step",
  warrant: "announce",
  body: "The chapter `story/world/pages/fairweather/stories/written/fairweather/chapters/fairweather-0002-skills-used-none.story-chapter-written.ts` is at reviewers.\n\nThis chapter came back for repair, not to be made again: mend each fault where it lands and keep the rest as it is. The faults are in the file beside it:\n- `story/world/pages/fairweather/stories/written/fairweather/chapters/fairweather-0002-skills-used-none.story-chapter-written.issues.txt`, listing 2 faults\nThe game master has the final say, and ruled out 2 issues in `story/world/pages/fairweather/stories/written/fairweather/chapters/fairweather-0002-skills-used-none.story-chapter-written.rulings.jsonl`, each a json line naming the issue and the reason: a ruled-out issue is ended.\n",
} as const satisfies AgentMessage
