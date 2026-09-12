import type { Message } from "akasha/agents/messaging/messages/message.page-type.types.ts"

export const message8ec7d4a40744 = {
  id: "01a097a8-da2a-7000-bab4-8ec7d4a40744",
  type: "message",
  slug: "message-8ec7d4a40744",
  to: "aranya",
  from: "service-watching",
  warrant: "announce",
  body: "`eso-addon-deploying` is broken. eso-addon-deploying.service failed, and systemd says `exit-code`. It broke just now. What that service is and what it runs are on its page. Its log is `journalctl --user -u eso-addon-deploying.service`.\n",
} as const satisfies Message
