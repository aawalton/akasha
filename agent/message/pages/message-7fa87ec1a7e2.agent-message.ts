import type { AgentMessage } from "akasha/agent/message/agent-message.page-type.types.ts"

export const message7fa87ec1a7e2 = {
  id: "01a11405-9f61-7000-b42b-7fa87ec1a7e2",
  type: "page-type/agent-message",
  slug: "message-7fa87ec1a7e2",
  to: "seat/mari-game-master-encounters",
  from: "story-step",
  warrant: "announce",
  body: "The chapter `story/world/pages/encounters/stories/written/encounters/chapters/encounters-0011-last-night.story-chapter-written.ts` is at mechanics.\n\nThis chapter came back for repair, not to be made again: mend each fault where it lands and keep the rest as it is. The faults are in the file beside it:\n- `story/world/pages/encounters/stories/written/encounters/chapters/encounters-0011-last-night.story-chapter-written.issues.txt`, listing 6 faults\nThe game master has the final say, and ruled out 1 issue in `story/world/pages/encounters/stories/written/encounters/chapters/encounters-0011-last-night.story-chapter-written.rulings.jsonl`, each a json line naming the issue and the reason: a ruled-out issue is ended.\n",
} as const satisfies AgentMessage
