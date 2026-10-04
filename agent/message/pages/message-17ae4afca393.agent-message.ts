import type { AgentMessage } from "akasha/agent/message/agent-message.page-type.types.ts"

export const message17ae4afca393 = {
  id: "01a104a7-e8b7-7000-b890-17ae4afca393",
  type: "page-type/agent-message",
  slug: "message-17ae4afca393",
  to: "seat/mari-game-master-fairweather",
  from: "story-step",
  warrant: "announce",
  body: "The chapter `story/world/pages/fairweather/stories/written/fairweather/chapters/fairweather-0003-a-goat-lantern.story-chapter-written.ts` is at game-master.\n\nThis chapter came back for repair, not to be made again: mend each fault where it lands and keep the rest as it is. The faults are in the file beside it:\n- `story/world/pages/fairweather/stories/written/fairweather/chapters/fairweather-0003-a-goat-lantern.story-chapter-written.issues.txt`, listing 9 faults\nThe game master has the final say, and ruled out 1 issue in `story/world/pages/fairweather/stories/written/fairweather/chapters/fairweather-0003-a-goat-lantern.story-chapter-written.rulings.jsonl`, each a json line naming the issue and the reason: a ruled-out issue is ended.\n",
} as const satisfies AgentMessage
