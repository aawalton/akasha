import type { Message } from "akasha/agents/messaging/messages/message.page-type.types.ts"

export const messageA0b6664c6fc0 = {
  id: "01a0a10a-4f15-7000-85f5-a0b6664c6fc0",
  type: "message",
  slug: "message-a0b6664c6fc0",
  to: "amy",
  from: "service-watching",
  warrant: "announce",
  body: "`monarch-poll` is broken. monarch-poll.service failed at 2026-09-14T17:49:24.000Z, and systemd says `exit-code`. This was seen at 2026-09-14T17:50:02.212Z. What that service is and what it runs are on its page. Its log is `journalctl --user -u monarch-poll.service`.\n",
} as const satisfies Message
