import type { Message } from "../message.page-type.ts"

export const messageA5c00eb0f785 = {
  id: "01a06c2d-bfb7-7000-9cff-a5c00eb0f785",
  pageTypeSlug: "message",
  slug: "message-a5c00eb0f785",
  to: "athena",
  from: "supervisor",
  warrant: "announce",
  body: "`alan` (01a06a36-ec89-7000-81df-e42e0c4d0031) was absent with inbound work waiting, so the recipient-resolver tried to revive it. The revive did not take — it either never booted or came back without advancing past the revive baseline. Nothing has been restarted, and the work that reached it is still waiting.\n",
} as const satisfies Message
