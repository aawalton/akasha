import type { Message } from "akasha/agent/messaging/message/message.page-type.types.ts"

export const messageF7492128a2fc = {
  id: "01a0c85f-447d-7000-8b64-f7492128a2fc",
  type: "page-type/message",
  slug: "message-f7492128a2fc",
  to: "seat/amy",
  from: "service-watching",
  warrant: "announce",
  body: "`monarch-poll` is broken. monarch-poll.service failed at 2026-09-22T09:07:32.000Z, and systemd says `exit-code`. This was seen at 2026-09-22T09:08:01.490Z. What that service is and what it runs are on its page. Its log is `journalctl --user -u monarch-poll.service`.\n",
} as const satisfies Message
