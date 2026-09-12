import type { Message } from "akasha/agents/messaging/messages/message.page-type.types.ts"

export const messageBb16427f1e1c = {
  id: "01a097fd-1f88-7000-b157-bb16427f1e1c",
  type: "message",
  slug: "message-bb16427f1e1c",
  to: "aranya",
  from: "service-watching",
  warrant: "announce",
  body: "`eso-addon-deploying` is broken. eso-addon-deploying.service failed, and systemd says `exit-code`. It broke just now. What that service is and what it runs are on its page. Its log is `journalctl --user -u eso-addon-deploying.service`.\n",
} as const satisfies Message
