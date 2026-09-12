import type { Message } from "akasha/agents/messaging/messages/message.page-type.types.ts"

export const messageCbd6e9970475 = {
  id: "01a0967b-ae82-7000-88b0-cbd6e9970475",
  type: "message",
  slug: "message-cbd6e9970475",
  to: "aranya",
  from: "service-watching",
  warrant: "announce",
  body: "`eso-addon-deploying` is broken. eso-addon-deploying.service failed, and systemd says `exit-code`. It broke just now. What that service is and what it runs are on its page. Its log is `journalctl --user -u eso-addon-deploying.service`.\n",
} as const satisfies Message
