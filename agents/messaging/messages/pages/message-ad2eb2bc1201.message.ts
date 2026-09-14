import type { Message } from "akasha/agents/messaging/messages/message.page-type.types.ts"

export const messageAd2eb2bc1201 = {
  id: "01a0a05c-65f4-7000-b70a-ad2eb2bc1201",
  type: "message",
  slug: "message-ad2eb2bc1201",
  to: "aranya",
  from: "service-watching",
  warrant: "announce",
  body: "`eso-addon-deploying` is broken. eso-addon-deploying.service failed at 2026-09-14T14:39:45.000Z, and systemd says `exit-code`. This was seen at 2026-09-14T14:40:04.936Z. What that service is and what it runs are on its page. Its log is `journalctl --user -u eso-addon-deploying.service`.\n",
} as const satisfies Message
