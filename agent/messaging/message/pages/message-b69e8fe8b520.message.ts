import type { Message } from "akasha/agent/messaging/message/message.page-type.types.ts"

export const messageB69e8fe8b520 = {
  id: "01a0a2b5-e605-7000-8bae-b69e8fe8b520",
  type: "message",
  slug: "message-b69e8fe8b520",
  to: "seat/amy",
  from: "service-watching",
  warrant: "announce",
  body: "`monarch-poll` is broken. monarch-poll.service failed at 2026-09-15T01:37:03.000Z, and systemd says `exit-code`. This was seen at 2026-09-15T01:37:03.921Z. What that service is and what it runs are on its page. Its log is `journalctl --user -u monarch-poll.service`.\n",
} as const satisfies Message
