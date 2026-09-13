import type { Message } from "akasha/agents/messaging/messages/message.page-type.types.ts"

export const message096e2b1361de = {
  id: "01a09b17-c79d-7000-bc35-096e2b1361de",
  type: "message",
  slug: "message-096e2b1361de",
  to: "aranya",
  from: "service-watching",
  warrant: "announce",
  body: "`eso-addon-deploying` is broken. eso-addon-deploying.service failed, and systemd says `exit-code`. It broke just now. What that service is and what it runs are on its page. Its log is `journalctl --user -u eso-addon-deploying.service`.\n",
} as const satisfies Message
