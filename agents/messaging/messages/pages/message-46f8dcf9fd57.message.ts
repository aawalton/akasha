import type { Message } from "akasha/agents/messaging/messages/message.page-type.types.ts"

export const message46f8dcf9fd57 = {
  id: "01a09608-5b79-7000-8007-46f8dcf9fd57",
  type: "message",
  slug: "message-46f8dcf9fd57",
  to: "aranya",
  from: "service-watching",
  warrant: "announce",
  body: "`eso-addon-deploying` is broken. eso-addon-deploying.service failed, and systemd says `exit-code`. It broke just now. What that service is and what it runs are on its page. Its log is `journalctl --user -u eso-addon-deploying.service`.\n",
} as const satisfies Message
