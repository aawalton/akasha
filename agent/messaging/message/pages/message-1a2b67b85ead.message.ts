import type { Message } from "akasha/agent/messaging/message/message.page-type.types.ts"

export const message1a2b67b85ead = {
  id: "01a0a218-670d-7000-b901-1a2b67b85ead",
  type: "message",
  slug: "message-1a2b67b85ead",
  to: "seat/amy",
  from: "service-watching",
  warrant: "announce",
  body: "`monarch-poll` is broken. monarch-poll.service failed at 2026-09-14T22:44:33.000Z, and systemd says `exit-code`. This was seen at 2026-09-14T22:45:03.171Z. What that service is and what it runs are on its page. Its log is `journalctl --user -u monarch-poll.service`.\n",
} as const satisfies Message
