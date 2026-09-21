import type { Message } from "akasha/agent/messaging/message/message.page-type.types.ts"

export const messageCc239060dd08 = {
  id: "01a0c43b-1aca-7000-a989-cc239060dd08",
  type: "page-type/message",
  slug: "message-cc239060dd08",
  to: "seat/eppie",
  from: "service-watching",
  warrant: "announce",
  body: "`spotify-sync` is broken. spotify-sync.service failed at 2026-09-21T13:46:48.000Z, and systemd says `exit-code`. This was seen at 2026-09-21T13:50:02.651Z. What that service is and what it runs are on its page. Its log is `journalctl --user -u spotify-sync.service`.\n",
} as const satisfies Message
