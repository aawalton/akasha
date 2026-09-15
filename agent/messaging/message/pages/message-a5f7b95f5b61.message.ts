import type { Message } from "akasha/agent/messaging/message/message.page-type.types.ts"

export const messageA5f7b95f5b61 = {
  id: "01a0a525-0c7f-7000-bd3f-a5f7b95f5b61",
  type: "message",
  slug: "message-a5f7b95f5b61",
  to: "seat/amy",
  from: "service-watching",
  warrant: "announce",
  body: "`monarch-reading-service` is broken. monarch-reading-service.service failed at 2026-09-15T12:55:02.000Z, and systemd says `exit-code`. This was seen at 2026-09-15T12:57:13.256Z. What that service is and what it runs are on its page. Its log is `journalctl --user -u monarch-reading-service.service`.\n",
} as const satisfies Message
