import type { Message } from "akasha/agents/messaging/messages/message.page-type.types.ts"

export const messageC2fc79b3d9e7 = {
  id: "01a096b2-9efa-7000-b1a3-c2fc79b3d9e7",
  type: "message",
  slug: "message-c2fc79b3d9e7",
  to: "aranya",
  from: "service-watching",
  warrant: "announce",
  body: "`eso-addon-deploying` is broken. eso-addon-deploying.service failed, and systemd says `exit-code`. It broke just now. What that service is and what it runs are on its page. Its log is `journalctl --user -u eso-addon-deploying.service`.\n",
} as const satisfies Message
