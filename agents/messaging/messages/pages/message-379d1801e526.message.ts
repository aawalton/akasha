import type { Message } from "akasha/agents/messaging/messages/message.page-type.types.ts"

export const message379d1801e526 = {
  id: "01a09758-4b17-7000-abfa-379d1801e526",
  type: "message",
  slug: "message-379d1801e526",
  to: "aranya",
  from: "service-watching",
  warrant: "announce",
  body: "`eso-addon-deploying` is broken. eso-addon-deploying.service failed, and systemd says `exit-code`. It broke just now. What that service is and what it runs are on its page. Its log is `journalctl --user -u eso-addon-deploying.service`.\n",
} as const satisfies Message
