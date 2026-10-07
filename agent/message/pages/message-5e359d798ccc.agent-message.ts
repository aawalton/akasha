import type { AgentMessage } from "akasha/agent/message/agent-message.page-type.types.ts"

export const message5e359d798ccc = {
  id: "01a11409-4312-7000-bc90-5e359d798ccc",
  type: "page-type/agent-message",
  slug: "message-5e359d798ccc",
  to: "seat/mari-game-master-encounters",
  from: "story-step",
  warrant: "announce",
  body: "The chapter `story/world/pages/encounters/stories/written/encounters/chapters/encounters-0011-last-night.story-chapter-written.ts` is at mechanics.\n\nThis chapter came back for repair, not to be made again: mend each fault where it lands and keep the rest as it is. The faults are in the file beside it:\n- `story/world/pages/encounters/stories/written/encounters/chapters/encounters-0011-last-night.story-chapter-written.issues.txt`, listing 1 fault\nThe game master has the final say, and ruled out 1 issue in `story/world/pages/encounters/stories/written/encounters/chapters/encounters-0011-last-night.story-chapter-written.rulings.jsonl`, each a json line naming the issue and the reason: a ruled-out issue is ended.\n",
} as const satisfies AgentMessage
