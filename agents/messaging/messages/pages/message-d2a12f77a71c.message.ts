import type { Message } from "akasha/agents/messaging/messages/message.page-type.types.ts"

export const messageD2a12f77a71c = {
  id: "01a0a1a5-f848-7000-97b7-d2a12f77a71c",
  type: "message",
  slug: "message-d2a12f77a71c",
  to: "aranya",
  from: "service-watching",
  warrant: "announce",
  body: "`eso-addon-deploying` is broken. eso-addon-deploying.service failed at 2026-09-14T20:39:32.000Z, and systemd says `exit-code`. This was seen at 2026-09-14T20:40:03.702Z. What that service is and what it runs are on its page. Its log is `journalctl --user -u eso-addon-deploying.service`.\n",
} as const satisfies Message
