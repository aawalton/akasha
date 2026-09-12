import type { Message } from "akasha/agents/messaging/messages/message.page-type.types.ts"

export const message15ceae0dc5d2 = {
  id: "01a0966a-438e-7000-88be-15ceae0dc5d2",
  type: "message",
  slug: "message-15ceae0dc5d2",
  to: "aranya",
  from: "service-watching",
  warrant: "announce",
  body: "`eso-addon-deploying` is broken. eso-addon-deploying.service failed, and systemd says `exit-code`. It broke just now. What that service is and what it runs are on its page. Its log is `journalctl --user -u eso-addon-deploying.service`.\n",
} as const satisfies Message
