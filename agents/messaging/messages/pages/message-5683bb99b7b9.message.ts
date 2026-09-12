import type { Message } from "akasha/agents/messaging/messages/message.page-type.types.ts"

export const message5683bb99b7b9 = {
  id: "01a096a0-503a-7000-bb52-5683bb99b7b9",
  type: "message",
  slug: "message-5683bb99b7b9",
  to: "aranya",
  from: "service-watching",
  warrant: "announce",
  body: "`eso-addon-deploying` is broken. eso-addon-deploying.service failed, and systemd says `exit-code`. It broke just now. What that service is and what it runs are on its page. Its log is `journalctl --user -u eso-addon-deploying.service`.\n",
} as const satisfies Message
