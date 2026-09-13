import type { Message } from "akasha/agents/messaging/messages/message.page-type.types.ts"

export const messageBd697878cd94 = {
  id: "01a09b7c-aabf-7000-a44a-bd697878cd94",
  type: "message",
  slug: "message-bd697878cd94",
  to: "aranya",
  from: "service-watching",
  warrant: "announce",
  body: "`eso-addon-deploying` is broken. eso-addon-deploying.service failed, and systemd says `exit-code`. It broke just now. What that service is and what it runs are on its page. Its log is `journalctl --user -u eso-addon-deploying.service`.\n",
} as const satisfies Message
