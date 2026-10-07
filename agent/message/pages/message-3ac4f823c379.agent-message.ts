import type { AgentMessage } from "akasha/agent/message/agent-message.page-type.types.ts"

export const message3ac4f823c379 = {
  id: "01a113d4-27d1-7000-8528-3ac4f823c379",
  type: "page-type/agent-message",
  slug: "message-3ac4f823c379",
  to: "seat/mari-writer-encounters",
  from: "story-step",
  warrant: "announce",
  body: "The chapter `story/world/pages/encounters/stories/written/encounters/chapters/encounters-0008-color-coded.story-chapter-written.ts` is at recorders.\n\nThis chapter came back for repair, not to be made again: mend each fault where it lands and keep the rest as it is. The faults are in the file beside it:\n- `story/world/pages/encounters/stories/written/encounters/chapters/encounters-0008-color-coded.story-chapter-written.issues.txt`, listing 4 faults\nThe game master has the final say, and ruled out 8 issues in `story/world/pages/encounters/stories/written/encounters/chapters/encounters-0008-color-coded.story-chapter-written.rulings.jsonl`, each a json line naming the issue and the reason: a ruled-out issue is ended.\n",
} as const satisfies AgentMessage
