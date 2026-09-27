import type { AgentMessage } from "akasha/agent/message/agent-message.page-type.types.ts"

export const messageA4e292edd9ab = {
  id: "01a0e4b0-9897-7000-a002-a4e292edd9ab",
  type: "page-type/agent-message",
  slug: "message-a4e292edd9ab",
  to: "seat/iris-game-master-otherwhere",
  from: "story-turn",
  warrant: "announce",
  body: "The turn `story/world/pages/library-system-reset-overdue-book-four-stubbed/stories/played/otherwhere/turns/otherwhere-00-019.story-turn-played.ts` is at game-master.\n\nThese lore pages have changed since you last read them:\n- `story/world/pages/library-system-reset-overdue-book-four-stubbed/places/otherwhere-main-hall.place.ts`\n",
} as const satisfies AgentMessage
