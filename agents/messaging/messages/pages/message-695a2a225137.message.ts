import type { Message } from "akasha/agents/messaging/messages/message.page-type.types.ts"

export const message695a2a225137 = {
  id: "01a0968c-2379-7000-aa10-695a2a225137",
  type: "message",
  slug: "message-695a2a225137",
  to: "aranya",
  from: "service-watching",
  warrant: "announce",
  body: "`eso-addon-deploying` is broken. eso-addon-deploying.service failed, and systemd says `exit-code`. It broke just now. What that service is and what it runs are on its page. Its log is `journalctl --user -u eso-addon-deploying.service`.\n",
} as const satisfies Message
