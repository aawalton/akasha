import type { Message } from "akasha/agents/messaging/messages/message.page-type.types.ts"

export const message5ca33e9924fc = {
  id: "01a096fd-afe2-7000-aa6a-5ca33e9924fc",
  type: "message",
  slug: "message-5ca33e9924fc",
  to: "aranya",
  from: "service-watching",
  warrant: "announce",
  body: "`eso-addon-deploying` is broken. eso-addon-deploying.service failed, and systemd says `exit-code`. It broke just now. What that service is and what it runs are on its page. Its log is `journalctl --user -u eso-addon-deploying.service`.\n",
} as const satisfies Message
