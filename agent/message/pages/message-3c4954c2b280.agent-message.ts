import type { AgentMessage } from "akasha/agent/message/agent-message.page-type.types.ts"

export const message3c4954c2b280 = {
  id: "01a0e918-92a5-7aae-a771-3c4954c2b280",
  type: "page-type/agent-message",
  slug: "message-3c4954c2b280",
  to: "seat/mari",
  from: "alan",
  warrant: "announce",
  body: "Hi Mari, I’m communicating from the seat page. Do you have a way to post an image that will show up here? The standard Claude Tool won’t work, I think we’ll need to build something. Basically an image mention that the seat page renders correctly inline?\n",
} as const satisfies AgentMessage
