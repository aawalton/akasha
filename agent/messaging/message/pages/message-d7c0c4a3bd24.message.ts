import type { Message } from "akasha/agent/messaging/message/message.page-type.types.ts"

export const messageD7c0c4a3bd24 = {
  id: "01a0a524-99c7-7000-bfd6-d7c0c4a3bd24",
  type: "message",
  slug: "message-d7c0c4a3bd24",
  to: "seat/amy",
  from: "service-watching",
  warrant: "announce",
  body: "`cost-relay-service` is broken. cost-relay-service.service failed at 2026-09-15T12:53:14.000Z, and systemd says `exit-code`. This was seen at 2026-09-15T12:57:13.256Z. What that service is and what it runs are on its page. Its log is `journalctl --user -u cost-relay-service.service`.\n",
} as const satisfies Message
