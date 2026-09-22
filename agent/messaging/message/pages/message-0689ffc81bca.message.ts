import type { Message } from "akasha/agent/messaging/message/message.page-type.types.ts"

export const message0689ffc81bca = {
  id: "01a0c958-5ae0-7000-bdaf-0689ffc81bca",
  type: "page-type/message",
  slug: "message-0689ffc81bca",
  to: "seat/elin",
  from: "service-watching",
  warrant: "announce",
  body: "`great-courses-sync` is broken. great-courses-sync.service failed at 2026-09-22T13:39:38.000Z, and systemd says `exit-code`. This was seen at 2026-09-22T13:40:05.407Z. What that service is and what it runs are on its page. Its log is `journalctl --user -u great-courses-sync.service`.\n",
} as const satisfies Message
