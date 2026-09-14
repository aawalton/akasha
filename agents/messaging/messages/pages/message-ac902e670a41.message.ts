import type { Message } from "akasha/agents/messaging/messages/message.page-type.types.ts"

export const messageAc902e670a41 = {
  id: "01a0a1a0-7ae0-7000-8291-ac902e670a41",
  type: "message",
  slug: "message-ac902e670a41",
  to: "amy",
  from: "service-watching",
  warrant: "announce",
  body: "`monarch-poll` is broken. monarch-poll.service failed at 2026-09-14T20:33:22.000Z, and systemd says `exit-code`. This was seen at 2026-09-14T20:34:03.946Z. What that service is and what it runs are on its page. Its log is `journalctl --user -u monarch-poll.service`.\n",
} as const satisfies Message
