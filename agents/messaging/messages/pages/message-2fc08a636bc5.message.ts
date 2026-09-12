import type { Message } from "akasha/agents/messaging/messages/message.page-type.types.ts"

export const message2fc08a636bc5 = {
  id: "01a0966b-47d1-7000-8eb4-2fc08a636bc5",
  type: "message",
  slug: "message-2fc08a636bc5",
  to: "aranya",
  from: "service-watching",
  warrant: "announce",
  body: "`container-recipe-deploying` is broken. container-recipe-deploying.service failed, and systemd says `exit-code`. It broke just now. What that service is and what it runs are on its page. Its log is `journalctl --user -u container-recipe-deploying.service`.\n",
} as const satisfies Message
