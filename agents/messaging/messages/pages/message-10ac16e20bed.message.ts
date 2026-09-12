import type { Message } from "akasha/agents/messaging/messages/message.page-type.types.ts"

export const message10ac16e20bed = {
  id: "01a09682-0c8b-7000-be99-10ac16e20bed",
  type: "message",
  slug: "message-10ac16e20bed",
  to: "aranya",
  from: "service-watching",
  warrant: "announce",
  body: "`eso-addon-deploying` is broken. eso-addon-deploying.service failed, and systemd says `exit-code`. It broke just now. What that service is and what it runs are on its page. Its log is `journalctl --user -u eso-addon-deploying.service`.\n",
} as const satisfies Message
