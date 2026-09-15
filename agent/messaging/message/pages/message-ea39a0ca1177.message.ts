import type { Message } from "akasha/agent/messaging/message/message.page-type.types.ts"

export const messageEa39a0ca1177 = {
  id: "01a0a2ac-bf53-7000-b95e-ea39a0ca1177",
  type: "message",
  slug: "message-ea39a0ca1177",
  to: "seat/aranya",
  from: "service-watching",
  warrant: "announce",
  body: "`container-recipe-deploying` is broken. container-recipe-deploying.service failed at 2026-09-15T01:26:32.000Z, and systemd says `exit-code`. This was seen at 2026-09-15T01:27:04.503Z. What that service is and what it runs are on its page. Its log is `journalctl --user -u container-recipe-deploying.service`.\n",
} as const satisfies Message
