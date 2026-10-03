import type { AgentMessage } from "akasha/agent/message/agent-message.page-type.types.ts"

export const messageF24086e0cf50 = {
  id: "01a10399-36e9-71db-a209-f24086e0cf50",
  type: "page-type/agent-message",
  slug: "message-f24086e0cf50",
  to: "seat/mari",
  from: "alan",
  warrant: "announce",
  body: "Okay, while that is running, I have another request for both played and written stories. I’d like a place in the ui for me to add player intent, to guide the player actions persistently across turns, at whatever level of granularity I want to direct things. This should let me do things like give persistent instructions to cover food, drink, and sleep and should be respected by the game master. As part of this, I’d like to make turn duration for played stories more flexible. The turn should continue until more intent is needed from the player, such as a novel or uncovered circumstance, whether that is long or short. Questions?\n",
} as const satisfies AgentMessage
