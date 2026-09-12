import type { Message } from "akasha/agents/messaging/messages/message.page-type.types.ts"

export const message78754133a71b = {
  id: "01a097cc-97ad-7000-bff6-78754133a71b",
  type: "message",
  slug: "message-78754133a71b",
  to: "aranya",
  from: "service-watching",
  warrant: "announce",
  body: "`eso-addon-deploying` is broken. eso-addon-deploying.service failed, and systemd says `exit-code`. It broke just now. What that service is and what it runs are on its page. Its log is `journalctl --user -u eso-addon-deploying.service`.\n",
} as const satisfies Message
