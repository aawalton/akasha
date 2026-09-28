import type { AgentMessage } from "akasha/agent/message/agent-message.page-type.types.ts"

export const message1e779210737d = {
  id: "01a0e7b9-9e1d-7000-bacd-1e779210737d",
  type: "page-type/agent-message",
  slug: "message-1e779210737d",
  to: "seat/iris-world-builder-otherwhere",
  from: "story-turn",
  warrant: "announce",
  body: "The turn `story/world/pages/library-system-reset-overdue-book-four-stubbed/stories/played/otherwhere/turns/otherwhere-00-053.story-turn-played.ts` is at writer.\n\nThe lore in play on the turn is on `story/world/pages/library-system-reset-overdue-book-four-stubbed/places/otherwhere-main-hall.place.ts`. Read each of those pages whole first, since any of them can settle what the turn may say.\n",
} as const satisfies AgentMessage
