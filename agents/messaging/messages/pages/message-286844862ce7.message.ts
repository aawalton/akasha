import type { Message } from "akasha/agents/messaging/messages/message.page-type.types.ts"

export const message286844862ce7 = {
  id: "01a09b7c-951a-7000-9751-286844862ce7",
  type: "message",
  slug: "message-286844862ce7",
  to: "aranya",
  from: "service-watching",
  warrant: "announce",
  body: "`container-recipe-deploying` is broken. container-recipe-deploying.service failed, and systemd says `exit-code`. It broke just now. What that service is and what it runs are on its page. Its log is `journalctl --user -u container-recipe-deploying.service`.\n",
} as const satisfies Message
