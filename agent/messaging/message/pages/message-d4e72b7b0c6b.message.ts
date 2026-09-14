import type { Message } from "akasha/agent/messaging/message/message.page-type.types.ts"

export const messageD4e72b7b0c6b = {
  id: "01a0a1ec-9109-7000-b285-d4e72b7b0c6b",
  type: "message",
  slug: "message-d4e72b7b0c6b",
  to: "seat/aranya",
  from: "service-watching",
  warrant: "announce",
  body: "`web-app-deploying` is broken. web-app-deploying.service failed at 2026-09-14T21:56:09.000Z, and systemd says `exit-code`. This was seen at 2026-09-14T21:57:02.021Z. What that service is and what it runs are on its page. Its log is `journalctl --user -u web-app-deploying.service`.\n",
} as const satisfies Message
