import type { Message } from "akasha/agents/messaging/messages/message.page-type.types.ts"

export const message42e4beb698d3 = {
  id: "01a09734-abf7-7000-9351-42e4beb698d3",
  type: "message",
  slug: "message-42e4beb698d3",
  to: "aranya",
  from: "service-watching",
  warrant: "announce",
  body: "`eso-addon-deploying` is broken. eso-addon-deploying.service failed, and systemd says `exit-code`. It broke just now. What that service is and what it runs are on its page. Its log is `journalctl --user -u eso-addon-deploying.service`.\n",
} as const satisfies Message
