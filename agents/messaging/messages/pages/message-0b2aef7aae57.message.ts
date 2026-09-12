import type { Message } from "akasha/agents/messaging/messages/message.page-type.types.ts"

export const message0b2aef7aae57 = {
  id: "01a096c4-0713-7000-9e2b-0b2aef7aae57",
  type: "message",
  slug: "message-0b2aef7aae57",
  to: "aranya",
  from: "service-watching",
  warrant: "announce",
  body: "`eso-addon-deploying` is broken. eso-addon-deploying.service failed, and systemd says `exit-code`. It broke just now. What that service is and what it runs are on its page. Its log is `journalctl --user -u eso-addon-deploying.service`.\n",
} as const satisfies Message
