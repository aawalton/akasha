import type { Message } from "akasha/agent/messaging/message/message.page-type.types.ts"

export const messageA7d2d2e7b7c7 = {
  id: "01a0a525-475d-7000-881e-a7d2d2e7b7c7",
  type: "message",
  slug: "message-a7d2d2e7b7c7",
  to: "seat/amy",
  from: "service-watching",
  warrant: "announce",
  body: "`monarch-relay-service` is broken. monarch-relay-service.service failed at 2026-09-15T12:52:07.000Z, and systemd says `exit-code`. This was seen at 2026-09-15T12:57:13.256Z. What that service is and what it runs are on its page. Its log is `journalctl --user -u monarch-relay-service.service`.\n",
} as const satisfies Message
