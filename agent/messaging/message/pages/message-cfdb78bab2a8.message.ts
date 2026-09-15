import type { Message } from "akasha/agent/messaging/message/message.page-type.types.ts"

export const messageCfdb78bab2a8 = {
  id: "01a0a306-d8ac-7000-a463-cfdb78bab2a8",
  type: "message",
  slug: "message-cfdb78bab2a8",
  to: "seat/amy",
  from: "service-watching",
  warrant: "announce",
  body: "`monarch-poll` is broken. monarch-poll.service failed at 2026-09-15T03:04:05.000Z, and systemd says `exit-code`. This was seen at 2026-09-15T03:05:00.915Z. What that service is and what it runs are on its page. Its log is `journalctl --user -u monarch-poll.service`.\n",
} as const satisfies Message
