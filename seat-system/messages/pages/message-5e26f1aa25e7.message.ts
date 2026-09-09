import type { Message } from "../message.page-type.ts"

export const message5e26f1aa25e7 = {
  id: "01a082f4-aa27-7000-a364-5e26f1aa25e7",
  pageTypeSlug: "message",
  type: "message",
  slug: "message-5e26f1aa25e7",
  to: "athena",
  from: "supervisor",
  warrant: "announce",
  body: "`aranya` (01a06cf3-4196-7000-b027-4bdf82d518a6) was absent with inbound work waiting, so the recipient-resolver tried to revive it. The revive did not take — it either never booted or came back without advancing past the revive baseline. Nothing has been restarted, and the work that reached it is still waiting.\n",
} as const satisfies Message
