import type { Message } from "akasha/agents/messaging/messages/message.page-type.types.ts"

export const messageAe5d39c7147f = {
  id: "01a09c5a-0f9d-7000-b780-ae5d39c7147f",
  type: "message",
  slug: "message-ae5d39c7147f",
  to: "aranya",
  from: "service-watching",
  warrant: "announce",
  body: "`container-recipe-deploying` is broken. container-recipe-deploying.service failed, and systemd says `exit-code`. It broke just now. What that service is and what it runs are on its page. Its log is `journalctl --user -u container-recipe-deploying.service`.\n",
} as const satisfies Message
