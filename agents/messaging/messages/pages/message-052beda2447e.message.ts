import type { Message } from "akasha/agents/messaging/messages/message.page-type.types.ts"

export const message052beda2447e = {
  id: "01a0966e-e8c8-7000-ba0e-052beda2447e",
  type: "message",
  slug: "message-052beda2447e",
  to: "aranya",
  from: "service-watching",
  warrant: "announce",
  body: "`container-recipe-deploying` is broken. container-recipe-deploying.service failed, and systemd says `exit-code`. It broke just now. What that service is and what it runs are on its page. Its log is `journalctl --user -u container-recipe-deploying.service`.\n",
} as const satisfies Message
