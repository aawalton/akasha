import type { Message } from "akasha/agent/messaging/message/message.page-type.types.ts"

export const messageD41a0aef88f7 = {
  id: "01a0c5e6-c048-7000-98d8-d41a0aef88f7",
  type: "page-type/message",
  slug: "message-d41a0aef88f7",
  to: "seat/amy",
  from: "service-watching",
  warrant: "announce",
  body: "`monarch-poll` is broken. monarch-poll.service failed at 2026-09-21T21:36:41.000Z, and systemd says `exit-code`. This was seen at 2026-09-21T21:37:02.016Z. What that service is and what it runs are on its page. Its log is `journalctl --user -u monarch-poll.service`.\n",
} as const satisfies Message
