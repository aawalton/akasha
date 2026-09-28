import type { AgentMessage } from "akasha/agent/message/agent-message.page-type.types.ts"

export const message1fbd1d5f4ba5 = {
  id: "01a0e943-3abd-7000-90c8-1fbd1d5f4ba5",
  type: "page-type/agent-message",
  slug: "message-1fbd1d5f4ba5",
  to: "seat/iris-game-master-otherwhere",
  from: "story-turn",
  warrant: "announce",
  body: "The turn `story/world/pages/library-system-reset-overdue-book-four-stubbed/stories/played/otherwhere/turns/otherwhere-00-070.story-turn-played.ts` is at writer.\n\nThe lore in play on the turn is on `story/world/pages/library-system-reset-overdue-book-four-stubbed/places/otherwhere-main-hall.place.ts`. Read each of those pages whole first, since any of them can settle what the turn may say.\n",
} as const satisfies AgentMessage
