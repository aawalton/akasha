import type { Message } from "akasha/agents/messaging/messages/message.page-type.types.ts"

export const message26b305acfb46 = {
  id: "01a09b07-5436-7000-97b9-26b305acfb46",
  type: "message",
  slug: "message-26b305acfb46",
  to: "aranya",
  from: "service-watching",
  warrant: "announce",
  body: "`eso-addon-deploying` is broken. eso-addon-deploying.service failed, and systemd says `exit-code`. It broke just now. What that service is and what it runs are on its page. Its log is `journalctl --user -u eso-addon-deploying.service`.\n",
} as const satisfies Message
