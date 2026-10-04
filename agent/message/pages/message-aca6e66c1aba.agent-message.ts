import type { AgentMessage } from "akasha/agent/message/agent-message.page-type.types.ts"

export const messageAca6e66c1aba = {
  id: "01a10477-ee12-7000-8396-aca6e66c1aba",
  type: "page-type/agent-message",
  slug: "message-aca6e66c1aba",
  to: "seat/mari-world-builder-fairweather",
  from: "story-step",
  warrant: "announce",
  body: "The chapter `story/world/pages/fairweather/stories/written/fairweather/chapters/fairweather-0001-the-leftovers.story-chapter-written.ts` is at recorders.\n\nThis chapter came back for repair, not to be made again: mend each fault where it lands and keep the rest as it is. The faults are in the file beside it:\n- `story/world/pages/fairweather/stories/written/fairweather/chapters/fairweather-0001-the-leftovers.story-chapter-written.issues.txt`, listing 14 faults\nThe game master has the final say, and ruled out 1 issue in `story/world/pages/fairweather/stories/written/fairweather/chapters/fairweather-0001-the-leftovers.story-chapter-written.rulings.jsonl`, each a json line naming the issue and the reason: a ruled-out issue is ended.\n",
} as const satisfies AgentMessage
