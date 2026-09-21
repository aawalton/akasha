import type { Message } from "akasha/agent/messaging/message/message.page-type.types.ts"

export const message9ec8046854d8 = {
  id: "01a0c638-2f3d-7000-8b90-9ec8046854d8",
  type: "page-type/message",
  slug: "message-9ec8046854d8",
  to: "seat/amy",
  from: "service-watching",
  warrant: "announce",
  body: "`monarch-poll` is broken. monarch-poll.service failed at 2026-09-21T23:06:04.000Z, and systemd says `exit-code`. This was seen at 2026-09-21T23:06:05.704Z. What that service is and what it runs are on its page. Its log is `journalctl --user -u monarch-poll.service`.\n",
} as const satisfies Message
