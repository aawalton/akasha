import type { Message } from "akasha/agents/messaging/messages/message.page-type.types.ts"

export const messageF6fb9e4cd525 = {
  id: "01a0a1c8-c26d-7000-8df7-f6fb9e4cd525",
  type: "message",
  slug: "message-f6fb9e4cd525",
  to: "seat/aranya",
  from: "service-watching",
  warrant: "announce",
  body: "`cluster-deploying` is broken. cluster-deploying.service failed at 2026-09-14T21:17:06.000Z, and systemd says `exit-code`. This was seen at 2026-09-14T21:18:03.741Z. What that service is and what it runs are on its page. Its log is `journalctl --user -u cluster-deploying.service`.\n",
} as const satisfies Message
