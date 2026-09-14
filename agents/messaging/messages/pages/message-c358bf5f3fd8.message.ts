import type { Message } from "akasha/agents/messaging/messages/message.page-type.types.ts"

export const messageC358bf5f3fd8 = {
  id: "01a0a05b-c9c6-7000-82dc-c358bf5f3fd8",
  type: "message",
  slug: "message-c358bf5f3fd8",
  to: "amy",
  from: "service-watching",
  warrant: "announce",
  body: "`monarch-poll` is broken. monarch-poll.service failed at 2026-09-14T14:38:05.000Z, and systemd says `exit-code`. This was seen at 2026-09-14T14:39:03.773Z. What that service is and what it runs are on its page. Its log is `journalctl --user -u monarch-poll.service`.\n",
} as const satisfies Message
