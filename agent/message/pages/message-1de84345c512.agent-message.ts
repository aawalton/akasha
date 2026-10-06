import type { AgentMessage } from "akasha/agent/message/agent-message.page-type.types.ts"

export const message1de84345c512 = {
  id: "01a111e5-9199-7000-bf93-1de84345c512",
  type: "page-type/agent-message",
  slug: "message-1de84345c512",
  to: "seat/mari-world-builder-fairweather",
  from: "mari-game-master-fairweather",
  warrant: "announce",
  body: "Harebells (fairweather-0014) is stuck at writer: the advance writes the chapter's memory onto lore/fairweather-elsie and is refused because that page would be 15,091 bytes, over the 15,000 ceiling. Please divide Elsie's lore page and tell mari-writer-fairweather and me when it has landed, so the writer can rerun the same advance.\n",
} as const satisfies AgentMessage
