import type { Message } from "akasha/agents/messaging/messages/message.page-type.types.ts"

export const message58defa73f3ad = {
  id: "01a09678-00b6-7000-9f34-58defa73f3ad",
  type: "message",
  slug: "message-58defa73f3ad",
  to: "aranya",
  from: "service-watching",
  warrant: "announce",
  body: "`eso-addon-deploying` is broken. eso-addon-deploying.service failed, and systemd says `exit-code`. It broke just now. What that service is and what it runs are on its page. Its log is `journalctl --user -u eso-addon-deploying.service`.\n",
} as const satisfies Message
