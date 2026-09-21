import type { Message } from "akasha/agent/messaging/message/message.page-type.types.ts"

export const message3d21b85a9833 = {
  id: "01a0c5e6-b3d1-7000-8c35-3d21b85a9833",
  type: "page-type/message",
  slug: "message-3d21b85a9833",
  to: "seat/amy",
  from: "service-watching",
  warrant: "announce",
  body: "`monarch-reading-service` is broken. monarch-reading-service.service failed at 2026-09-21T21:36:41.000Z, and systemd says `exit-code`. This was seen at 2026-09-21T21:37:02.016Z. What that service is and what it runs are on its page. Its log is `journalctl --user -u monarch-reading-service.service`.\n",
} as const satisfies Message
