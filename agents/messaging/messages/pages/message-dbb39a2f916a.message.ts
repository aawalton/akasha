import type { Message } from "akasha/agents/messaging/messages/message.page-type.types.ts"

export const messageDbb39a2f916a = {
  id: "01a0a1a8-ac86-7000-9572-dbb39a2f916a",
  type: "message",
  slug: "message-dbb39a2f916a",
  to: "aranya",
  from: "service-watching",
  warrant: "announce",
  body: "`eso-addon-deploying` is broken. eso-addon-deploying.service failed at 2026-09-14T20:42:29.000Z, and systemd says `exit-code`. This was seen at 2026-09-14T20:43:00.965Z. What that service is and what it runs are on its page. Its log is `journalctl --user -u eso-addon-deploying.service`.\n",
} as const satisfies Message
