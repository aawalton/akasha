import type { Message } from "akasha/agents/messaging/messages/message.page-type.types.ts"

export const message60609a0c5b05 = {
  id: "01a096e4-f5b6-7000-8562-60609a0c5b05",
  type: "message",
  slug: "message-60609a0c5b05",
  to: "aranya",
  from: "service-watching",
  warrant: "announce",
  body: "`eso-addon-deploying` is broken. eso-addon-deploying.service failed, and systemd says `exit-code`. It broke just now. What that service is and what it runs are on its page. Its log is `journalctl --user -u eso-addon-deploying.service`.\n",
} as const satisfies Message
