import type { Message } from "akasha/agents/messaging/messages/message.page-type.types.ts"

export const message24d46f2a6713 = {
  id: "01a09760-8a8f-7000-8530-24d46f2a6713",
  type: "message",
  slug: "message-24d46f2a6713",
  to: "aranya",
  from: "service-watching",
  warrant: "announce",
  body: "`eso-addon-deploying` is broken. eso-addon-deploying.service failed, and systemd says `exit-code`. It broke just now. What that service is and what it runs are on its page. Its log is `journalctl --user -u eso-addon-deploying.service`.\n",
} as const satisfies Message
