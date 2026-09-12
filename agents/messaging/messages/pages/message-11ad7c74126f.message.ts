import type { Message } from "akasha/agents/messaging/messages/message.page-type.types.ts"

export const message11ad7c74126f = {
  id: "01a096a8-8fb7-7000-9b3e-11ad7c74126f",
  type: "message",
  slug: "message-11ad7c74126f",
  to: "aranya",
  from: "service-watching",
  warrant: "announce",
  body: "`eso-addon-deploying` is broken. eso-addon-deploying.service failed, and systemd says `exit-code`. It broke just now. What that service is and what it runs are on its page. Its log is `journalctl --user -u eso-addon-deploying.service`.\n",
} as const satisfies Message
