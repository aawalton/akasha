import type { Message } from "akasha/agents/messaging/messages/message.page-type.types.ts"

export const messageC4f3ec9852f4 = {
  id: "01a09b10-7efc-7000-8185-c4f3ec9852f4",
  type: "message",
  slug: "message-c4f3ec9852f4",
  to: "aranya",
  from: "service-watching",
  warrant: "announce",
  body: "`eso-addon-deploying` is broken. eso-addon-deploying.service failed, and systemd says `exit-code`. It broke just now. What that service is and what it runs are on its page. Its log is `journalctl --user -u eso-addon-deploying.service`.\n",
} as const satisfies Message
