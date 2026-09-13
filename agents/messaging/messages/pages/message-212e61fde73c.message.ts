import type { Message } from "akasha/agents/messaging/messages/message.page-type.types.ts"

export const message212e61fde73c = {
  id: "01a09b7c-7b69-7000-8158-212e61fde73c",
  type: "message",
  slug: "message-212e61fde73c",
  to: "aranya",
  from: "service-watching",
  warrant: "announce",
  body: "`cluster-deploying` is broken. cluster-deploying.service failed, and systemd says `exit-code`. It broke just now. What that service is and what it runs are on its page. Its log is `journalctl --user -u cluster-deploying.service`.\n",
} as const satisfies Message
