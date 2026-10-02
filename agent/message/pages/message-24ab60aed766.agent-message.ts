import type { AgentMessage } from "akasha/agent/message/agent-message.page-type.types.ts"

export const message24ab60aed766 = {
  id: "01a0fd69-85bc-750e-9737-24ab60aed766",
  type: "page-type/agent-message",
  slug: "message-24ab60aed766",
  to: "seat/iris",
  from: "alan",
  warrant: "announce",
  body: "Okay, here is a shift. I would like scene images to render inline in the story instead of hidden in the ui section. This may require an update to the storage format and backfill for existing scene / turn images. The image should come right after what it describes.\n",
} as const satisfies AgentMessage
