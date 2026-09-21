import type { Message } from "akasha/agent/messaging/message/message.page-type.types.ts"

export const messageC8d84d3b63e2 = {
  id: "01a0c520-f4e1-7000-9ddc-c8d84d3b63e2",
  type: "page-type/message",
  slug: "message-c8d84d3b63e2",
  to: "seat/eppie",
  from: "service-watching",
  warrant: "announce",
  body: "`music-capture` is broken. music-capture.service failed at 2026-09-21T18:00:35.000Z, and systemd says `exit-code`. This was seen at 2026-09-21T18:01:06.188Z. What that service is and what it runs are on its page. Its log is `journalctl --user -u music-capture.service`.\n",
} as const satisfies Message
