import type { Message } from "akasha/agents/messaging/messages/message.page-type.types.ts"

export const messageBe8a120552e2 = {
  id: "01a09754-a596-7000-a9c3-be8a120552e2",
  type: "message",
  slug: "message-be8a120552e2",
  to: "aranya",
  from: "service-watching",
  warrant: "announce",
  body: "`eso-addon-deploying` is broken. eso-addon-deploying.service failed, and systemd says `exit-code`. It broke just now. What that service is and what it runs are on its page. Its log is `journalctl --user -u eso-addon-deploying.service`.\n",
} as const satisfies Message
