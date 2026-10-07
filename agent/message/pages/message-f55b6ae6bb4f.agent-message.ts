import type { AgentMessage } from "akasha/agent/message/agent-message.page-type.types.ts"

export const messageF55b6ae6bb4f = {
  id: "01a113ce-f9c2-7000-9ccd-f55b6ae6bb4f",
  type: "page-type/agent-message",
  slug: "message-f55b6ae6bb4f",
  to: "seat/mari-world-builder-encounters",
  from: "story-step",
  warrant: "announce",
  body: "The chapter `story/world/pages/encounters/stories/written/encounters/chapters/encounters-0008-color-coded.story-chapter-written.ts` is at game-master.\n\nThis chapter came back for repair, not to be made again: mend each fault where it lands and keep the rest as it is. The faults are in the files beside it:\n- `story/world/pages/encounters/stories/written/encounters/chapters/encounters-0008-color-coded.story-chapter-written.issues.txt`, listing 10 faults\n- `story/world/pages/encounters/stories/written/encounters/chapters/encounters-0008-color-coded.story-chapter-written.mechanics-issues.txt`, listing 7 faults\nThe game master has the final say, and ruled out 1 issue in `story/world/pages/encounters/stories/written/encounters/chapters/encounters-0008-color-coded.story-chapter-written.rulings.jsonl`, each a json line naming the issue and the reason: a ruled-out issue is ended.\n",
} as const satisfies AgentMessage
