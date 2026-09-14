import type { Message } from "akasha/agent/messaging/message/message.page-type.types.ts"

export const message842e25a6e5dc = {
  id: "01a0a211-0c99-7000-8ac5-842e25a6e5dc",
  type: "message",
  slug: "message-842e25a6e5dc",
  to: "seat/aranya",
  from: "service-watching",
  warrant: "announce",
  body: "`container-recipe-deploying` is broken. container-recipe-deploying.service failed at 2026-09-14T22:36:10.000Z, and systemd says `exit-code`. This was seen at 2026-09-14T22:37:01.304Z. What that service is and what it runs are on its page. Its log is `journalctl --user -u container-recipe-deploying.service`.\n",
} as const satisfies Message
