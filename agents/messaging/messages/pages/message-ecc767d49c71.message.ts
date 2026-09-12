import type { Message } from "akasha/agents/messaging/messages/message.page-type.types.ts"

export const messageEcc767d49c71 = {
  id: "01a0970d-46c3-7000-bd0d-ecc767d49c71",
  type: "message",
  slug: "message-ecc767d49c71",
  to: "aranya",
  from: "service-watching",
  warrant: "announce",
  body: "`eso-addon-deploying` is broken. eso-addon-deploying.service failed, and systemd says `exit-code`. It broke just now. What that service is and what it runs are on its page. Its log is `journalctl --user -u eso-addon-deploying.service`.\n",
} as const satisfies Message
