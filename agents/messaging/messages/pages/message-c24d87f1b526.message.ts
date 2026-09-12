import type { Message } from "akasha/agents/messaging/messages/message.page-type.types.ts"

export const messageC24d87f1b526 = {
  id: "01a097a2-7511-7000-9c39-c24d87f1b526",
  type: "message",
  slug: "message-c24d87f1b526",
  to: "aranya",
  from: "service-watching",
  warrant: "announce",
  body: "`eso-addon-deploying` is broken. eso-addon-deploying.service failed, and systemd says `exit-code`. It broke just now. What that service is and what it runs are on its page. Its log is `journalctl --user -u eso-addon-deploying.service`.\n",
} as const satisfies Message
