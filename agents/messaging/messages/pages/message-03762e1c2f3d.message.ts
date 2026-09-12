import type { Message } from "akasha/agents/messaging/messages/message.page-type.types.ts"

export const message03762e1c2f3d = {
  id: "01a0962b-2141-7000-85f2-03762e1c2f3d",
  type: "message",
  slug: "message-03762e1c2f3d",
  to: "aranya",
  from: "service-watching",
  warrant: "announce",
  body: "`eso-addon-deploying` is broken. eso-addon-deploying.service failed, and systemd says `exit-code`. It broke just now. What that service is and what it runs are on its page. Its log is `journalctl --user -u eso-addon-deploying.service`.\n",
} as const satisfies Message
