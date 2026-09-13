import type { Message } from "akasha/agents/messaging/messages/message.page-type.types.ts"

export const message7dc901e40970 = {
  id: "01a09b03-a35c-7000-a70d-7dc901e40970",
  type: "message",
  slug: "message-7dc901e40970",
  to: "aranya",
  from: "service-watching",
  warrant: "announce",
  body: "`eso-addon-deploying` is broken. eso-addon-deploying.service failed, and systemd says `exit-code`. It broke just now. What that service is and what it runs are on its page. Its log is `journalctl --user -u eso-addon-deploying.service`.\n",
} as const satisfies Message
