import type { Message } from "akasha/agent/messaging/message/message.page-type.types.ts"

export const message912c909f7d97 = {
  id: "01a0a2a0-0784-7000-b5cb-912c909f7d97",
  type: "message",
  slug: "message-912c909f7d97",
  to: "seat/amy",
  from: "service-watching",
  warrant: "announce",
  body: "`monarch-poll` is broken. monarch-poll.service failed at 2026-09-15T01:13:00.000Z, and systemd says `exit-code`. This was seen at 2026-09-15T01:13:03.250Z. What that service is and what it runs are on its page. Its log is `journalctl --user -u monarch-poll.service`.\n",
} as const satisfies Message
