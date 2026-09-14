import type { Message } from "akasha/agents/messaging/message/message.page-type.types.ts"

export const message6160c2d57d1c = {
  id: "01a0a1fa-26a9-7000-ae6b-6160c2d57d1c",
  type: "message",
  slug: "message-6160c2d57d1c",
  to: "seat/ember",
  from: "service-watching",
  warrant: "announce",
  body: "`ttc-client` is broken. ttc-client.service is `inactive` rather than running, and has been since 2026-09-14T22:09:25.000Z. This was seen at 2026-09-14T22:12:00.638Z. What that service is and what it runs are on its page. Its log is `journalctl --user -u ttc-client.service`.\n",
} as const satisfies Message
