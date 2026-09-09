import type { Message } from "../message.page-type.ts"

export const message27d6372f8df4 = {
  id: "01a082ca-dc43-7000-8348-27d6372f8df4",
  pageTypeSlug: "message",
  type: "message",
  slug: "message-27d6372f8df4",
  to: "athena",
  from: "supervisor",
  warrant: "announce",
  body: "`aelwyn` (01a07ceb-63ec-7000-9477-5a923beff3be) was absent with inbound work waiting, so the recipient-resolver tried to revive it. The revive did not take — it either never booted or came back without advancing past the revive baseline. Nothing has been restarted, and the work that reached it is still waiting.\n",
} as const satisfies Message
