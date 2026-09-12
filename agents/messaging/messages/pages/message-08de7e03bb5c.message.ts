import type { Message } from "akasha/agents/messaging/messages/message.page-type.types.ts"

export const message08de7e03bb5c = {
  id: "01a0964a-3400-7000-8555-08de7e03bb5c",
  type: "message",
  slug: "message-08de7e03bb5c",
  to: "aranya",
  from: "service-watching",
  warrant: "announce",
  body: "`eso-addon-deploying` is broken. eso-addon-deploying.service failed, and systemd says `exit-code`. It broke just now. What that service is and what it runs are on its page. Its log is `journalctl --user -u eso-addon-deploying.service`.\n",
} as const satisfies Message
