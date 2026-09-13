import type { Message } from "akasha/agents/messaging/messages/message.page-type.types.ts"

export const messageEad8cf3658c6 = {
  id: "01a09b0b-de41-7000-b3f8-ead8cf3658c6",
  type: "message",
  slug: "message-ead8cf3658c6",
  to: "aranya",
  from: "service-watching",
  warrant: "announce",
  body: "`eso-addon-deploying` is broken. eso-addon-deploying.service failed, and systemd says `exit-code`. It broke just now. What that service is and what it runs are on its page. Its log is `journalctl --user -u eso-addon-deploying.service`.\n",
} as const satisfies Message
