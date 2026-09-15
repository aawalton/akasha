import type { Message } from "akasha/agent/messaging/message/message.page-type.types.ts"

export const message474d7b0e4054 = {
  id: "01a0a576-f85e-7000-a4bb-474d7b0e4054",
  type: "message",
  slug: "message-474d7b0e4054",
  to: "seat/amy",
  from: "service-watching",
  warrant: "announce",
  body: "`capacity-relay-service` is broken. capacity-relay-service.service failed at 2026-09-15T14:22:26.000Z, and systemd says `exit-code`. This was seen at 2026-09-15T14:27:01.016Z. What that service is and what it runs are on its page. Its log is `journalctl --user -u capacity-relay-service.service`.\n",
} as const satisfies Message
