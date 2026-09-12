import type { Message } from "akasha/agents/messaging/messages/message.page-type.types.ts"

export const message3c2383705401 = {
  id: "01a09774-b67d-7000-8caf-3c2383705401",
  type: "message",
  slug: "message-3c2383705401",
  to: "aranya",
  from: "service-watching",
  warrant: "announce",
  body: "`eso-addon-deploying` is broken. eso-addon-deploying.service failed, and systemd says `exit-code`. It broke just now. What that service is and what it runs are on its page. Its log is `journalctl --user -u eso-addon-deploying.service`.\n",
} as const satisfies Message
