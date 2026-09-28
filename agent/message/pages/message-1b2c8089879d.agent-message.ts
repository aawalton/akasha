import type { AgentMessage } from "akasha/agent/message/agent-message.page-type.types.ts"

export const message1b2c8089879d = {
  id: "01a0ea1f-4d64-7000-8bec-1b2c8089879d",
  type: "page-type/agent-message",
  slug: "message-1b2c8089879d",
  to: "seat/iris-game-master-otherwhere-iii",
  from: "story-step",
  warrant: "announce",
  body: "The turn `story/world/pages/super-supportive/stories/played/otherwhere-iii/turns/otherwhere-iii-00-007.story-turn-played.ts` is at writer.\n\nThe lore in play on the turn is on `story/world/pages/super-supportive/lore/otherwhere-iii-nala.lore.ts`, `story/world/pages/super-supportive/places/otherwhere-iii-uptown-memorial-er.place.ts`. Read each of those pages whole first, since any of them can settle what the turn may say.\n",
} as const satisfies AgentMessage
