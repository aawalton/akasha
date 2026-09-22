import type { Message } from "akasha/agent/messaging/message/message.page-type.types.ts"

export const messageFa51166416f9 = {
  id: "01a0c97d-d80d-7000-a512-fa51166416f9",
  type: "page-type/message",
  slug: "message-fa51166416f9",
  to: "seat/ember",
  from: "service-watching",
  warrant: "announce",
  body: "`ttc-client` is broken. ttc-client.service last ended badly at 2026-09-22T14:21:02.000Z, and systemd says `exit-code`. This was seen at 2026-09-22T14:21:02.471Z. What that service is and what it runs are on its page. Its log is `journalctl --user -u ttc-client.service`.\n",
} as const satisfies Message
