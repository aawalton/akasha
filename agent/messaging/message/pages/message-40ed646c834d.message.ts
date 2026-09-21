import type { Message } from "akasha/agent/messaging/message/message.page-type.types.ts"

export const message40ed646c834d = {
  id: "01a0c520-1cf3-7000-83f3-40ed646c834d",
  type: "page-type/message",
  slug: "message-40ed646c834d",
  to: "seat/thea",
  from: "audit-running",
  warrant: "announce",
  body: "the audit at 848ba175de7d1b556b070d1b3102208aa7d8d37b found 1 check newly refusing.\n`index-is-level-with-the-pages` refused 48 times:\n  addon/type/arkadius-trade-tools/arkadius-trade-tools.type-declaration.referenced-by — the index entry for this file is in the index differing from what its page says\n  addon/type/bui/bui.type-declaration.referenced-by — the index entry for this file is in the index differing from what its page says\n  addon/type/crafting-addon-neighbours/crafting-addon-neighbours.type-declaration.referenced-by — the index entry for this file is in the index differing from what its page says\n  addon/type/custom-compass-pins/custom-compass-pins.type-declaration.referenced-by — the index entry for this file is in the index differing from what its page says\n  addon/type/fcois/fcois.type-declaration.referenced-by — the index entry for this file is in the index differing from what its page says\nwhat each of them answered is on the newest row of the audit log beside that check's page.\n",
} as const satisfies Message
