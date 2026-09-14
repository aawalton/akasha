import type { Message } from "akasha/agent/messaging/message/message.page-type.types.ts"

export const message924c4734cfd9 = {
  id: "01a0a1ec-706e-7000-865a-924c4734cfd9",
  type: "message",
  slug: "message-924c4734cfd9",
  to: "seat/aranya",
  from: "service-watching",
  warrant: "announce",
  body: "`container-recipe-deploying` is broken. container-recipe-deploying.service failed at 2026-09-14T21:56:06.000Z, and systemd says `exit-code`. This was seen at 2026-09-14T21:57:02.021Z. What that service is and what it runs are on its page. Its log is `journalctl --user -u container-recipe-deploying.service`.\n",
} as const satisfies Message
