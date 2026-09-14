import type { Message } from "akasha/agents/messaging/message/message.page-type.types.ts"

export const message991870b6a7b1 = {
  id: "01a0a1d9-4007-7000-b196-991870b6a7b1",
  type: "message",
  slug: "message-991870b6a7b1",
  to: "seat/aranya",
  from: "service-watching",
  warrant: "announce",
  body: "`container-recipe-deploying` is broken. container-recipe-deploying.service failed at 2026-09-14T21:35:08.000Z, and systemd says `exit-code`. This was seen at 2026-09-14T21:36:04.469Z. What that service is and what it runs are on its page. Its log is `journalctl --user -u container-recipe-deploying.service`.\n",
} as const satisfies Message
