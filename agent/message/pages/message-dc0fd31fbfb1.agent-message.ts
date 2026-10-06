import type { AgentMessage } from "akasha/agent/message/agent-message.page-type.types.ts"

export const messageDc0fd31fbfb1 = {
  id: "01a11123-527d-7000-a829-dc0fd31fbfb1",
  type: "page-type/agent-message",
  slug: "message-dc0fd31fbfb1",
  to: "seat/mari-game-master-fairweather",
  from: "story-step",
  warrant: "announce",
  body: "The chapter `story/world/pages/fairweather/stories/written/fairweather/chapters/fairweather-0011-moonpenny.story-chapter-written.ts` is at mechanics.\n\nThis chapter came back for repair, not to be made again: mend each fault where it lands and keep the rest as it is. The faults are in the file beside it:\n- `story/world/pages/fairweather/stories/written/fairweather/chapters/fairweather-0011-moonpenny.story-chapter-written.issues.txt`, listing 7 faults\nThe game master has the final say, and ruled out 4 issues in `story/world/pages/fairweather/stories/written/fairweather/chapters/fairweather-0011-moonpenny.story-chapter-written.rulings.jsonl`, each a json line naming the issue and the reason: a ruled-out issue is ended.\n",
} as const satisfies AgentMessage
