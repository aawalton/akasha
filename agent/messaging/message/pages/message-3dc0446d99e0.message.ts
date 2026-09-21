import type { Message } from "akasha/agent/messaging/message/message.page-type.types.ts"

export const message3dc0446d99e0 = {
  id: "01a0c4d9-5916-7000-853e-3dc0446d99e0",
  type: "page-type/message",
  slug: "message-3dc0446d99e0",
  to: "seat/thea",
  from: "audit-running",
  warrant: "announce",
  body: "the audit at c2a8c73dfc00037a8d9e3d35263b22b20e893718 found 1 check newly refusing.\n`index-is-level-with-the-pages` refused 3 times:\n  properties/slug.text-property.referenced-by — the index entry for this file is in the index differing from what its page says\n  relation-property/relation-property.page-type.referenced-by — the index entry for this file is in the index differing from what its page says\n  type/page-type.page-type.referenced-by — the index entry for this file is in the index differing from what its page says\nwhat each of them answered is on the newest row of the audit log beside that check's page.\n",
} as const satisfies Message
