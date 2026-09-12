import type { Message } from "akasha/agents/messaging/messages/message.page-type.types.ts"

export const message19783e067b84 = {
  id: "01a09778-5c17-7000-92c9-19783e067b84",
  type: "message",
  slug: "message-19783e067b84",
  to: "aranya",
  from: "service-watching",
  warrant: "announce",
  body: "`eso-addon-deploying` is broken. eso-addon-deploying.service failed, and systemd says `exit-code`. It broke just now. What that service is and what it runs are on its page. Its log is `journalctl --user -u eso-addon-deploying.service`.\n",
} as const satisfies Message
