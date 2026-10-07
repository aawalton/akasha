import type { AgentMessage } from "akasha/agent/message/agent-message.page-type.types.ts"

export const messageF843b80f106c = {
  id: "01a11406-d24e-7000-9f05-f843b80f106c",
  type: "page-type/agent-message",
  slug: "message-f843b80f106c",
  to: "seat/mari-game-master-encounters",
  from: "story-step",
  warrant: "announce",
  body: "The chapter `story/world/pages/encounters/stories/written/encounters/chapters/encounters-0011-last-night.story-chapter-written.ts` is at recorders.\n\nThis chapter came back for repair, not to be made again: mend each fault where it lands and keep the rest as it is. The faults are in the file beside it:\n- `story/world/pages/encounters/stories/written/encounters/chapters/encounters-0011-last-night.story-chapter-written.issues.txt`, listing 6 faults\nThe game master has the final say, and ruled out 1 issue in `story/world/pages/encounters/stories/written/encounters/chapters/encounters-0011-last-night.story-chapter-written.rulings.jsonl`, each a json line naming the issue and the reason: a ruled-out issue is ended.\n",
} as const satisfies AgentMessage
