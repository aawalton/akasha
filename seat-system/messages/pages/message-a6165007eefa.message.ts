import type { Message } from "../message.page-type.ts"

export const messageA6165007eefa = {
  id: "01a082ca-9fd9-7000-a15d-a6165007eefa",
  pageTypeSlug: "message",
  type: "message",
  slug: "message-a6165007eefa",
  to: "athena",
  from: "supervisor",
  warrant: "announce",
  body: "`thea` (01a06c31-1b01-7000-b602-fc1a3f96f3a4) was absent with inbound work waiting, so the recipient-resolver tried to revive it. The revive did not take — it either never booted or came back without advancing past the revive baseline. Nothing has been restarted, and the work that reached it is still waiting.\n",
} as const satisfies Message
