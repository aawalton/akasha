import type { Message } from "akasha/agents/messaging/messages/message.page-type.types.ts"

export const message981544fe0a7c = {
  id: "01a0a11f-5f20-7000-ba6e-981544fe0a7c",
  type: "message",
  slug: "message-981544fe0a7c",
  to: "amy",
  from: "service-watching",
  warrant: "announce",
  body: "`monarch-reading-service` is broken. monarch-reading-service.service failed at 2026-09-14T18:12:20.000Z, and systemd says `timeout`. This was seen at 2026-09-14T18:13:02.598Z. What that service is and what it runs are on its page. Its log is `journalctl --user -u monarch-reading-service.service`.\n",
} as const satisfies Message
