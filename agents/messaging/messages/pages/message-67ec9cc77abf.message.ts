import type { Message } from "akasha/agents/messaging/messages/message.page-type.types.ts"

export const message67ec9cc77abf = {
  id: "01a096f5-7dfa-7000-b7ad-67ec9cc77abf",
  type: "message",
  slug: "message-67ec9cc77abf",
  to: "aranya",
  from: "service-watching",
  warrant: "announce",
  body: "`eso-addon-deploying` is broken. eso-addon-deploying.service failed, and systemd says `exit-code`. It broke just now. What that service is and what it runs are on its page. Its log is `journalctl --user -u eso-addon-deploying.service`.\n",
} as const satisfies Message
