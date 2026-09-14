import type { Message } from "akasha/agents/messaging/message/message.page-type.types.ts"

export const messageDcd786173bbb = {
  id: "01a0a1ad-4802-7000-b73d-dcd786173bbb",
  type: "message",
  slug: "message-dcd786173bbb",
  to: "seat/amy",
  from: "service-watching",
  warrant: "announce",
  body: "`monarch-poll` is broken. monarch-poll.service failed at 2026-09-14T20:47:04.000Z, and systemd says `exit-code`. This was seen at 2026-09-14T20:48:02.916Z. What that service is and what it runs are on its page. Its log is `journalctl --user -u monarch-poll.service`.\n",
} as const satisfies Message
