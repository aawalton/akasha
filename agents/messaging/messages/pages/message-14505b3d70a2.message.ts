import type { Message } from "akasha/agents/messaging/messages/message.page-type.types.ts"

export const message14505b3d70a2 = {
  id: "01a09afa-58fa-7000-8126-14505b3d70a2",
  type: "message",
  slug: "message-14505b3d70a2",
  to: "aranya",
  from: "service-watching",
  warrant: "announce",
  body: "`cluster-deploying` is broken. cluster-deploying.service failed, and systemd says `exit-code`. It broke just now. What that service is and what it runs are on its page. Its log is `journalctl --user -u cluster-deploying.service`.\n",
} as const satisfies Message
