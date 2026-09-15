import type { Message } from "akasha/agent/messaging/message/message.page-type.types.ts"

export const messageF39ced167d41 = {
  id: "01a0a450-faf7-7000-a8b9-f39ced167d41",
  type: "message",
  slug: "message-f39ced167d41",
  to: "seat/amy",
  from: "service-watching",
  warrant: "announce",
  body: "`monarch-poll` is broken. monarch-poll.service failed at 2026-09-15T09:05:07.000Z, and systemd says `exit-code`. This was seen at 2026-09-15T09:06:04.926Z. What that service is and what it runs are on its page. Its log is `journalctl --user -u monarch-poll.service`.\n",
} as const satisfies Message
