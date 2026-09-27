import type { AgentMessage } from "akasha/agent/message/agent-message.page-type.types.ts"

export const message1eacb364ff8a = {
  id: "01a0e37c-9c81-7000-8145-1eacb364ff8a",
  type: "page-type/agent-message",
  slug: "message-1eacb364ff8a",
  to: "seat/iris-game-master-otherwhere",
  from: "story-turn",
  warrant: "announce",
  body: "The turn `story/world/pages/library-system-reset-overdue-book-four-stubbed/stories/played/otherwhere/turns/otherwhere-00-003.story-turn-played.ts` is at writer.\n\nThe lore about the turn's characters is on `story/world/pages/library-system-reset-overdue-book-four-stubbed/lore/otherwhere-alan.lore.ts`. Read each of those pages whole first, since any of them can settle what the turn may say.\n",
} as const satisfies AgentMessage
