import type { AgentMessage } from "akasha/agent/message/agent-message.page-type.types.ts"

export const messageA00827888701 = {
  id: "01a10754-ee69-7000-8fea-a00827888701",
  type: "page-type/agent-message",
  slug: "message-a00827888701",
  to: "seat/mari-world-builder-fairweather",
  from: "story-step",
  warrant: "announce",
  body: "The chapter `story/world/pages/fairweather/stories/written/fairweather/chapters/fairweather-0006-the-marigold.story-chapter-written.ts` is at reviewers.\n\nThis chapter came back for repair, not to be made again: mend each fault where it lands and keep the rest as it is. The faults are in the file beside it:\n- `story/world/pages/fairweather/stories/written/fairweather/chapters/fairweather-0006-the-marigold.story-chapter-written.issues.txt`, listing 11 faults\nThe game master has the final say, and ruled out 4 issues in `story/world/pages/fairweather/stories/written/fairweather/chapters/fairweather-0006-the-marigold.story-chapter-written.rulings.jsonl`, each a json line naming the issue and the reason: a ruled-out issue is ended.\n",
} as const satisfies AgentMessage
