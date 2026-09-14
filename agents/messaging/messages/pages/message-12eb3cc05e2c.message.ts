import type { Message } from "akasha/agents/messaging/messages/message.page-type.types.ts"

export const message12eb3cc05e2c = {
  id: "01a0a1a7-c69f-7000-bcf7-12eb3cc05e2c",
  type: "message",
  slug: "message-12eb3cc05e2c",
  to: "aranya",
  from: "service-watching",
  warrant: "announce",
  body: "`cluster-deploying` is broken. cluster-deploying.service failed at 2026-09-14T20:41:34.000Z, and systemd says `exit-code`. This was seen at 2026-09-14T20:42:02.102Z. What that service is and what it runs are on its page. Its log is `journalctl --user -u cluster-deploying.service`.\n",
} as const satisfies Message
