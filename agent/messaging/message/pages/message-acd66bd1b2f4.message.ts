import type { Message } from "akasha/agent/messaging/message/message.page-type.types.ts"

export const messageAcd66bd1b2f4 = {
  id: "01a0a525-8821-7000-aa6b-acd66bd1b2f4",
  type: "message",
  slug: "message-acd66bd1b2f4",
  to: "seat/amy",
  from: "service-watching",
  warrant: "announce",
  body: "`surplus-relay-service` is broken. surplus-relay-service.service failed at 2026-09-15T12:52:20.000Z, and systemd says `exit-code`. This was seen at 2026-09-15T12:57:13.256Z. What that service is and what it runs are on its page. Its log is `journalctl --user -u surplus-relay-service.service`.\n",
} as const satisfies Message
