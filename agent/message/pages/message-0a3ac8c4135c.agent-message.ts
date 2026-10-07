import type { AgentMessage } from "akasha/agent/message/agent-message.page-type.types.ts"

export const message0a3ac8c4135c = {
  id: "01a113d4-d516-7000-9f70-0a3ac8c4135c",
  type: "page-type/agent-message",
  slug: "message-0a3ac8c4135c",
  to: "seat/mari-game-master-encounters",
  from: "story-step",
  warrant: "announce",
  body: "The chapter `story/world/pages/encounters/stories/written/encounters/chapters/encounters-0008-color-coded.story-chapter-written.ts` is at reviewers.\n\nThis chapter came back for repair, not to be made again: mend each fault where it lands and keep the rest as it is. The faults are in the file beside it:\n- `story/world/pages/encounters/stories/written/encounters/chapters/encounters-0008-color-coded.story-chapter-written.issues.txt`, listing 4 faults\nThe game master has the final say, and ruled out 8 issues in `story/world/pages/encounters/stories/written/encounters/chapters/encounters-0008-color-coded.story-chapter-written.rulings.jsonl`, each a json line naming the issue and the reason: a ruled-out issue is ended.\n",
} as const satisfies AgentMessage
