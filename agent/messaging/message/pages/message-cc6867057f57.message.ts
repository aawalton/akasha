import type { Message } from "akasha/agent/messaging/message/message.page-type.types.ts"

export const messageCc6867057f57 = {
  id: "01a0c216-b8f6-7000-8fc8-cc6867057f57",
  type: "page-type/message",
  slug: "message-cc6867057f57",
  to: "seat/amy",
  from: "service-watching",
  warrant: "announce",
  body: "`monarch-reading-service` is broken. monarch-reading-service.service failed at 2026-09-21T03:50:33.000Z, and systemd says `exit-code`. This was seen at 2026-09-21T03:51:03.888Z. What that service is and what it runs are on its page. Its log is `journalctl --user -u monarch-reading-service.service`.\n",
} as const satisfies Message
