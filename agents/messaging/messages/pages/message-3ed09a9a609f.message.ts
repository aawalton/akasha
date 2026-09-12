import type { Message } from "akasha/agents/messaging/messages/message.page-type.types.ts"

export const message3ed09a9a609f = {
  id: "01a096d0-da6a-7000-b7df-3ed09a9a609f",
  type: "message",
  slug: "message-3ed09a9a609f",
  to: "aranya",
  from: "service-watching",
  warrant: "announce",
  body: "`eso-addon-deploying` is broken. eso-addon-deploying.service failed, and systemd says `exit-code`. It broke just now. What that service is and what it runs are on its page. Its log is `journalctl --user -u eso-addon-deploying.service`.\n",
} as const satisfies Message
