import type { AgentMessage } from "akasha/agent/message/agent-message.page-type.types.ts"

export const messageA1b8aed9f4c1 = {
  id: "01a11361-e889-7000-9128-a1b8aed9f4c1",
  type: "page-type/agent-message",
  slug: "message-a1b8aed9f4c1",
  to: "seat/mari-game-master-encounters",
  from: "story-step",
  warrant: "announce",
  body: "The chapter `story/world/pages/encounters/stories/written/encounters/chapters/encounters-0002-eleven.story-chapter-written.ts` is at game-master.\n\nThis chapter came back for repair, not to be made again: mend each fault where it lands and keep the rest as it is. The faults are in the file beside it:\n- `story/world/pages/encounters/stories/written/encounters/chapters/encounters-0002-eleven.story-chapter-written.issues.txt`, listing 8 faults\n",
} as const satisfies AgentMessage
