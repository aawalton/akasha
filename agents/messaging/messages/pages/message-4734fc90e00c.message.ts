import type { Message } from "akasha/agents/messaging/messages/message.page-type.types.ts"

export const message4734fc90e00c = {
  id: "01a09789-c630-7000-9fda-4734fc90e00c",
  type: "message",
  slug: "message-4734fc90e00c",
  to: "aranya",
  from: "service-watching",
  warrant: "announce",
  body: "`eso-addon-deploying` is broken. eso-addon-deploying.service failed, and systemd says `exit-code`. It broke just now. What that service is and what it runs are on its page. Its log is `journalctl --user -u eso-addon-deploying.service`.\n",
} as const satisfies Message
