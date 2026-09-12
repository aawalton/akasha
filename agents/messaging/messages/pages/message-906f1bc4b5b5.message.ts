import type { Message } from "akasha/agents/messaging/messages/message.page-type.types.ts"

export const message906f1bc4b5b5 = {
  id: "01a096ec-4361-7000-b49e-906f1bc4b5b5",
  type: "message",
  slug: "message-906f1bc4b5b5",
  to: "aranya",
  from: "service-watching",
  warrant: "announce",
  body: "`eso-addon-deploying` is broken. eso-addon-deploying.service failed, and systemd says `exit-code`. It broke just now. What that service is and what it runs are on its page. Its log is `journalctl --user -u eso-addon-deploying.service`.\n",
} as const satisfies Message
