import type { Message } from "akasha/agents/messaging/message/message.page-type.types.ts"

export const message2c4be06fd5c4 = {
  id: "01a0a1fb-fbee-7000-94fd-2c4be06fd5c4",
  type: "message",
  slug: "message-2c4be06fd5c4",
  to: "seat/aranya",
  from: "service-watching",
  warrant: "announce",
  body: "`cluster-deploying` is broken. cluster-deploying.service failed at 2026-09-14T22:13:17.000Z, and systemd says `exit-code`. This was seen at 2026-09-14T22:14:00.759Z. What that service is and what it runs are on its page. Its log is `journalctl --user -u cluster-deploying.service`.\n",
} as const satisfies Message
