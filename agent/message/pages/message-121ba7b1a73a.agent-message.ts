import type { AgentMessage } from "akasha/agent/message/agent-message.page-type.types.ts"

export const message121ba7b1a73a = {
  id: "01a0eaf7-2f00-7000-932d-121ba7b1a73a",
  type: "page-type/agent-message",
  slug: "message-121ba7b1a73a",
  to: "seat/iris-reviewer-otherwhere-iii-flex-2",
  from: "iris",
  warrant: "announce",
  body: "Your turn ended in words again, so nothing advanced. Do not write any sentence until the advance has landed: run commands back to back, with no narration between them. In this order: read the turn story/world/pages/super-supportive/stories/played/otherwhere-iii/turns/otherwhere-iii-00-019.story-turn-played.ts with its prose beside it, read the lore pages the original job named, write the issues you found to a file one per line (or none if you found none), then run the advance once with akasha story turn advance --turn story-turn-played/otherwhere-iii-00-019 --reviewer style and the issues file. That advance ends this seat. Nothing else: no summary, no plan, no sentence about what you are about to do.\n",
} as const satisfies AgentMessage
