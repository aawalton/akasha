import type { Message } from "akasha/agents/messaging/messages/message.page-type.types.ts"

export const message9320f6ae5c18 = {
  id: "01a09b0e-a9d0-7000-beaf-9320f6ae5c18",
  type: "message",
  slug: "message-9320f6ae5c18",
  to: "aranya",
  from: "service-watching",
  warrant: "announce",
  body: "`eso-addon-deploying` is broken. eso-addon-deploying.service failed, and systemd says `exit-code`. It broke just now. What that service is and what it runs are on its page. Its log is `journalctl --user -u eso-addon-deploying.service`.\n",
} as const satisfies Message
