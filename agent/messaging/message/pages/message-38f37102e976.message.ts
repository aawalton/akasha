import type { Message } from "akasha/agent/messaging/message/message.page-type.types.ts"

export const message38f37102e976 = {
  id: "01a0a703-37a1-7000-a666-38f37102e976",
  type: "page-type/message",
  slug: "message-38f37102e976",
  to: "seat/amy",
  from: "service-watching",
  warrant: "announce",
  body: "`monarch-poll` is broken. monarch-poll.service failed at 2026-09-15T21:39:08.000Z, and systemd says `exit-code`. This was seen at 2026-09-15T21:40:00.769Z. What that service is and what it runs are on its page. Its log is `journalctl --user -u monarch-poll.service`.\n",
} as const satisfies Message
