import type { Message } from "akasha/agents/messaging/messages/message.page-type.types.ts"

export const messageF006d5eb95fc = {
  id: "01a096e2-3057-7000-bd9c-f006d5eb95fc",
  type: "message",
  slug: "message-f006d5eb95fc",
  to: "aranya",
  from: "service-watching",
  warrant: "announce",
  body: "`eso-addon-deploying` is broken. eso-addon-deploying.service failed, and systemd says `exit-code`. It broke just now. What that service is and what it runs are on its page. Its log is `journalctl --user -u eso-addon-deploying.service`.\n",
} as const satisfies Message
