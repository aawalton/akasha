import type { Message } from "akasha/agents/messaging/messages/message.page-type.types.ts"

export const message6e320bcd18d9 = {
  id: "01a0a11f-8451-7000-b782-6e320bcd18d9",
  type: "message",
  slug: "message-6e320bcd18d9",
  to: "akasha",
  from: "service-watching",
  warrant: "announce",
  body: "`active-calories-service` is broken. active-calories-service.service failed at 2026-09-14T18:12:21.000Z, and systemd says `exit-code`. This was seen at 2026-09-14T18:13:02.598Z. What that service is and what it runs are on its page. Its log is `journalctl --user -u active-calories-service.service`.\n",
} as const satisfies Message
