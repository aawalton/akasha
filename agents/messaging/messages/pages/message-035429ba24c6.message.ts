import type { Message } from "akasha/agents/messaging/messages/message.page-type.types.ts"

export const message035429ba24c6 = {
  id: "01a09785-271b-7000-9064-035429ba24c6",
  type: "message",
  slug: "message-035429ba24c6",
  to: "aranya",
  from: "service-watching",
  warrant: "announce",
  body: "`eso-addon-deploying` is broken. eso-addon-deploying.service failed, and systemd says `exit-code`. It broke just now. What that service is and what it runs are on its page. Its log is `journalctl --user -u eso-addon-deploying.service`.\n",
} as const satisfies Message
