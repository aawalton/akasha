import type { AgentMessage } from "akasha/agent/message/agent-message.page-type.types.ts"

export const messageA921475df07b = {
  id: "01a113f4-d457-7000-8dc9-a921475df07b",
  type: "page-type/agent-message",
  slug: "message-a921475df07b",
  to: "seat/mari-world-builder-encounters",
  from: "story-step",
  warrant: "announce",
  body: "The chapter `story/world/pages/encounters/stories/written/encounters/chapters/encounters-0010-window-light.story-chapter-written.ts` is at reviewers.\n\nThis chapter came back for repair, not to be made again: mend each fault where it lands and keep the rest as it is. The faults are in the file beside it:\n- `story/world/pages/encounters/stories/written/encounters/chapters/encounters-0010-window-light.story-chapter-written.issues.txt`, listing 7 faults\nThe game master has the final say, and ruled out 3 issues in `story/world/pages/encounters/stories/written/encounters/chapters/encounters-0010-window-light.story-chapter-written.rulings.jsonl`, each a json line naming the issue and the reason: a ruled-out issue is ended.\n",
} as const satisfies AgentMessage
