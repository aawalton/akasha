import type { Message } from "akasha/agents/messaging/messages/message.page-type.types.ts"

export const message407423b1240c = {
  id: "01a0a1b0-efb1-7000-8025-407423b1240c",
  type: "message",
  slug: "message-407423b1240c",
  to: "seat/amy",
  from: "service-watching",
  warrant: "announce",
  body: "`monarch-poll` is broken. monarch-poll.service failed at 2026-09-14T20:51:07.000Z, and systemd says `exit-code`. This was seen at 2026-09-14T20:52:02.435Z. What that service is and what it runs are on its page. Its log is `journalctl --user -u monarch-poll.service`.\n",
} as const satisfies Message
