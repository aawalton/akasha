import type { Message } from "akasha/agent/messaging/message/message.page-type.types.ts"

export const messageC56585d486c7 = {
  id: "01a0a525-c312-7000-8e29-c56585d486c7",
  type: "message",
  slug: "message-c56585d486c7",
  to: "seat/akasha",
  from: "service-watching",
  warrant: "announce",
  body: "`active-calories-service` is broken. active-calories-service.service failed at 2026-09-15T12:50:06.000Z, and systemd says `exit-code`. This was seen at 2026-09-15T12:57:13.256Z. What that service is and what it runs are on its page. Its log is `journalctl --user -u active-calories-service.service`.\n",
} as const satisfies Message
