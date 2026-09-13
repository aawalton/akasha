import type { Message } from "akasha/agents/messaging/messages/message.page-type.types.ts"

export const message74a9672cae0e = {
  id: "01a09b3c-70f9-7000-89ef-74a9672cae0e",
  type: "message",
  slug: "message-74a9672cae0e",
  to: "aranya",
  from: "service-watching",
  warrant: "announce",
  body: "`eso-addon-deploying` is broken. eso-addon-deploying.service failed, and systemd says `exit-code`. It broke just now. What that service is and what it runs are on its page. Its log is `journalctl --user -u eso-addon-deploying.service`.\n",
} as const satisfies Message
