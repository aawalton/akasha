import type { Message } from "akasha/agents/messaging/messages/message.page-type.types.ts"

export const message6a28f188283e = {
  id: "01a09688-8e1b-7000-abbd-6a28f188283e",
  type: "message",
  slug: "message-6a28f188283e",
  to: "aranya",
  from: "service-watching",
  warrant: "announce",
  body: "`eso-addon-deploying` is broken. eso-addon-deploying.service failed, and systemd says `exit-code`. It broke just now. What that service is and what it runs are on its page. Its log is `journalctl --user -u eso-addon-deploying.service`.\n",
} as const satisfies Message
