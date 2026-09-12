import type { Message } from "akasha/agents/messaging/messages/message.page-type.types.ts"

export const message391a2f7e6c51 = {
  id: "01a0971a-1b2b-7000-9a78-391a2f7e6c51",
  type: "message",
  slug: "message-391a2f7e6c51",
  to: "aranya",
  from: "service-watching",
  warrant: "announce",
  body: "`eso-addon-deploying` is broken. eso-addon-deploying.service failed, and systemd says `exit-code`. It broke just now. What that service is and what it runs are on its page. Its log is `journalctl --user -u eso-addon-deploying.service`.\n",
} as const satisfies Message
