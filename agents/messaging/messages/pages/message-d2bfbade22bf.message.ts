import type { Message } from "akasha/agents/messaging/messages/message.page-type.types.ts"

export const messageD2bfbade22bf = {
  id: "01a09663-dca4-7000-be2a-d2bfbade22bf",
  type: "message",
  slug: "message-d2bfbade22bf",
  to: "aranya",
  from: "service-watching",
  warrant: "announce",
  body: "`eso-addon-deploying` is broken. eso-addon-deploying.service failed, and systemd says `exit-code`. It broke just now. What that service is and what it runs are on its page. Its log is `journalctl --user -u eso-addon-deploying.service`.\n",
} as const satisfies Message
