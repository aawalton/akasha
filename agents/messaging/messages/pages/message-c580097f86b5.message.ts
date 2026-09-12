import type { Message } from "akasha/agents/messaging/messages/message.page-type.types.ts"

export const messageC580097f86b5 = {
  id: "01a09651-8d58-7000-a2cc-c580097f86b5",
  type: "message",
  slug: "message-c580097f86b5",
  to: "aranya",
  from: "service-watching",
  warrant: "announce",
  body: "`eso-addon-deploying` is broken. eso-addon-deploying.service failed, and systemd says `exit-code`. It broke just now. What that service is and what it runs are on its page. Its log is `journalctl --user -u eso-addon-deploying.service`.\n",
} as const satisfies Message
