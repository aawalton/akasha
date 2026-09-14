import type { Message } from "akasha/agents/messaging/message/message.page-type.types.ts"

export const messageCd725f68f2f3 = {
  id: "01a0a12a-530d-7000-a6b2-cd725f68f2f3",
  type: "message",
  slug: "message-cd725f68f2f3",
  to: "seat/aranya",
  from: "service-watching",
  warrant: "announce",
  body: "`container-recipe-deploying` is broken. container-recipe-deploying.service failed at 2026-09-14T18:24:11.000Z, and systemd says `exit-code`. This was seen at 2026-09-14T18:25:00.512Z. What that service is and what it runs are on its page. Its log is `journalctl --user -u container-recipe-deploying.service`.\n",
} as const satisfies Message
