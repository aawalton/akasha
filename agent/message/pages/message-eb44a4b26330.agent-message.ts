import type { AgentMessage } from "akasha/agent/message/agent-message.page-type.types.ts"

export const messageEb44a4b26330 = {
  id: "01a107b0-8f0f-7000-b2d1-eb44a4b26330",
  type: "page-type/agent-message",
  slug: "message-eb44a4b26330",
  to: "seat/mari-game-master-fairweather",
  from: "story-step",
  warrant: "announce",
  body: "The chapter `story/world/pages/fairweather/stories/written/fairweather/chapters/fairweather-0009-the-copper-baths.story-chapter-written.ts` is at reviewers.\n\nThis chapter came back for repair, not to be made again: mend each fault where it lands and keep the rest as it is. The faults are in the file beside it:\n- `story/world/pages/fairweather/stories/written/fairweather/chapters/fairweather-0009-the-copper-baths.story-chapter-written.issues.txt`, listing 7 faults\nThe game master has the final say, and ruled out 1 issue in `story/world/pages/fairweather/stories/written/fairweather/chapters/fairweather-0009-the-copper-baths.story-chapter-written.rulings.jsonl`, each a json line naming the issue and the reason: a ruled-out issue is ended.\n",
} as const satisfies AgentMessage
