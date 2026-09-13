import type { Message } from "akasha/agents/messaging/messages/message.page-type.types.ts"

export const message96b646ee94c5 = {
  id: "01a09b1d-4977-7000-bebd-96b646ee94c5",
  type: "message",
  slug: "message-96b646ee94c5",
  to: "aranya",
  from: "service-watching",
  warrant: "announce",
  body: "`eso-addon-deploying` is broken. eso-addon-deploying.service failed, and systemd says `exit-code`. It broke just now. What that service is and what it runs are on its page. Its log is `journalctl --user -u eso-addon-deploying.service`.\n",
} as const satisfies Message
