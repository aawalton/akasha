import type { Message } from "akasha/agents/messaging/messages/message.page-type.types.ts"

export const message157150837be8 = {
  id: "01a097c6-2e55-7000-88f9-157150837be8",
  type: "message",
  slug: "message-157150837be8",
  to: "aranya",
  from: "service-watching",
  warrant: "announce",
  body: "`eso-addon-deploying` is broken. eso-addon-deploying.service failed, and systemd says `exit-code`. It broke just now. What that service is and what it runs are on its page. Its log is `journalctl --user -u eso-addon-deploying.service`.\n",
} as const satisfies Message
