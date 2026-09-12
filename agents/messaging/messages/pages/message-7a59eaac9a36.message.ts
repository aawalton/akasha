import type { Message } from "akasha/agents/messaging/messages/message.page-type.types.ts"

export const message7a59eaac9a36 = {
  id: "01a096a3-f845-7000-b28f-7a59eaac9a36",
  type: "message",
  slug: "message-7a59eaac9a36",
  to: "aranya",
  from: "service-watching",
  warrant: "announce",
  body: "`eso-addon-deploying` is broken. eso-addon-deploying.service failed, and systemd says `exit-code`. It broke just now. What that service is and what it runs are on its page. Its log is `journalctl --user -u eso-addon-deploying.service`.\n",
} as const satisfies Message
