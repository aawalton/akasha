import type { Message } from "akasha/agents/messaging/messages/message.page-type.types.ts"

export const messageBb39d308a986 = {
  id: "01a09701-5f5f-7000-a13f-bb39d308a986",
  type: "message",
  slug: "message-bb39d308a986",
  to: "aranya",
  from: "service-watching",
  warrant: "announce",
  body: "`eso-addon-deploying` is broken. eso-addon-deploying.service failed, and systemd says `exit-code`. It broke just now. What that service is and what it runs are on its page. Its log is `journalctl --user -u eso-addon-deploying.service`.\n",
} as const satisfies Message
