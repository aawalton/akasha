import type { Message } from "akasha/agents/messaging/messages/message.page-type.types.ts"

export const message356bb655c99b = {
  id: "01a0979c-fed7-7000-8dc9-356bb655c99b",
  type: "message",
  slug: "message-356bb655c99b",
  to: "aranya",
  from: "service-watching",
  warrant: "announce",
  body: "`eso-addon-deploying` is broken. eso-addon-deploying.service failed, and systemd says `exit-code`. It broke just now. What that service is and what it runs are on its page. Its log is `journalctl --user -u eso-addon-deploying.service`.\n",
} as const satisfies Message
