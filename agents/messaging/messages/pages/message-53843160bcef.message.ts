import type { Message } from "akasha/agents/messaging/messages/message.page-type.types.ts"

export const message53843160bcef = {
  id: "01a0964f-b53d-7000-914d-53843160bcef",
  type: "message",
  slug: "message-53843160bcef",
  to: "aranya",
  from: "service-watching",
  warrant: "announce",
  body: "`eso-addon-deploying` is broken. eso-addon-deploying.service failed, and systemd says `exit-code`. It broke just now. What that service is and what it runs are on its page. Its log is `journalctl --user -u eso-addon-deploying.service`.\n",
} as const satisfies Message
