import type { Message } from "../message.page-type.ts"

export const messageDe66429906f9 = {
  id: "01a08727-cfa3-7000-b28c-de66429906f9",
  pageTypeSlug: "message",
  type: "message",
  slug: "message-de66429906f9",
  to: "athena",
  from: "supervisor",
  warrant: "announce",
  body: "`aine` (01a08727-c731-7000-b6d3-d247c518c611) was absent with inbound work waiting, so the recipient-resolver tried to revive it. The revive did not take — it either never booted or came back without advancing past the revive baseline. Nothing has been restarted, and the work that reached it is still waiting.\n",
} as const satisfies Message
