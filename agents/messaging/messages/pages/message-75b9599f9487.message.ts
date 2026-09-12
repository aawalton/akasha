import type { Message } from "akasha/agents/messaging/messages/message.page-type.types.ts"

export const message75b9599f9487 = {
  id: "01a09670-b38a-7000-bc86-75b9599f9487",
  type: "message",
  slug: "message-75b9599f9487",
  to: "aranya",
  from: "service-watching",
  warrant: "announce",
  body: "`container-recipe-deploying` is broken. container-recipe-deploying.service failed, and systemd says `exit-code`. It broke just now. What that service is and what it runs are on its page. Its log is `journalctl --user -u container-recipe-deploying.service`.\n",
} as const satisfies Message
