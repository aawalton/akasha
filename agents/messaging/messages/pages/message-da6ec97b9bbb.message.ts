import type { Message } from "akasha/agents/messaging/messages/message.page-type.types.ts"

export const messageDa6ec97b9bbb = {
  id: "01a097e0-c6b0-7000-86ec-da6ec97b9bbb",
  type: "message",
  slug: "message-da6ec97b9bbb",
  to: "aranya",
  from: "service-watching",
  warrant: "announce",
  body: "`eso-addon-deploying` is broken. eso-addon-deploying.service failed, and systemd says `exit-code`. It broke just now. What that service is and what it runs are on its page. Its log is `journalctl --user -u eso-addon-deploying.service`.\n",
} as const satisfies Message
