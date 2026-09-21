import type { Message } from "akasha/agent/messaging/message/message.page-type.types.ts"

export const message565ec5294fd3 = {
  id: "01a0c5e6-cc29-7000-98c0-565ec5294fd3",
  type: "page-type/message",
  slug: "message-565ec5294fd3",
  to: "seat/eppie",
  from: "service-watching",
  warrant: "announce",
  body: "`music-capture` is broken. music-capture.service failed at 2026-09-21T21:36:41.000Z, and systemd says `exit-code`. This was seen at 2026-09-21T21:37:02.016Z. What that service is and what it runs are on its page. Its log is `journalctl --user -u music-capture.service`.\n",
} as const satisfies Message
