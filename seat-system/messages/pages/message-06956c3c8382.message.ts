import type { Message } from "../message.page-type.types.ts"

export const message06956c3c8382 = {
  id: "01a08852-0aaf-7000-9483-06956c3c8382",
  pageTypeSlug: "message",
  type: "message",
  slug: "message-06956c3c8382",
  to: "athena",
  from: "supervisor",
  warrant: "announce",
  body: "`amy` (01a087b5-1ca3-7000-bf5c-16aae1620c39) was absent with inbound work waiting, so the recipient-resolver tried to revive it. The revive did not take — it either never booted or came back without advancing past the revive baseline. Nothing has been restarted, and the work that reached it is still waiting.\n",
} as const satisfies Message
