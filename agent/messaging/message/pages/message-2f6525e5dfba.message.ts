import type { Message } from "akasha/agent/messaging/message/message.page-type.types.ts"

export const message2f6525e5dfba = {
  id: "01a0a577-d9c8-7000-a3db-2f6525e5dfba",
  type: "message",
  slug: "message-2f6525e5dfba",
  to: "seat/amy",
  from: "service-watching",
  warrant: "announce",
  body: "`plants-relay-service` is broken. plants-relay-service.service failed at 2026-09-15T14:22:24.000Z, and systemd says `exit-code`. This was seen at 2026-09-15T14:27:01.016Z. What that service is and what it runs are on its page. Its log is `journalctl --user -u plants-relay-service.service`.\n",
} as const satisfies Message
