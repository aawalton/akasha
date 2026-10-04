import type { AgentMessage } from "akasha/agent/message/agent-message.page-type.types.ts"

export const messageE43c0a3cf3ab = {
  id: "01a1078c-1d66-7000-b22c-e43c0a3cf3ab",
  type: "page-type/agent-message",
  slug: "message-e43c0a3cf3ab",
  to: "seat/mari-game-master-fairweather",
  from: "story-step",
  warrant: "announce",
  body: "The chapter `story/world/pages/fairweather/stories/written/fairweather/chapters/fairweather-0008-the-blue-door.story-chapter-written.ts` is at reviewers.\n\nThis chapter came back for repair, not to be made again: mend each fault where it lands and keep the rest as it is. The faults are in the file beside it:\n- `story/world/pages/fairweather/stories/written/fairweather/chapters/fairweather-0008-the-blue-door.story-chapter-written.issues.txt`, listing 4 faults\nThe game master has the final say, and ruled out 2 issues in `story/world/pages/fairweather/stories/written/fairweather/chapters/fairweather-0008-the-blue-door.story-chapter-written.rulings.jsonl`, each a json line naming the issue and the reason: a ruled-out issue is ended.\n\nThese lore pages have changed since you last read them:\n- `story/world/pages/fairweather/places/fairweather-lanternmere.place.ts`\n",
} as const satisfies AgentMessage
