import type { Message } from "akasha/agents/messaging/messages/message.page-type.types.ts"

export const messageD0d0a94b9470 = {
  id: "01a09793-d101-7000-a345-d0d0a94b9470",
  type: "message",
  slug: "message-d0d0a94b9470",
  to: "aranya",
  from: "service-watching",
  warrant: "announce",
  body: "`eso-addon-deploying` is broken. eso-addon-deploying.service failed, and systemd says `exit-code`. It broke just now. What that service is and what it runs are on its page. Its log is `journalctl --user -u eso-addon-deploying.service`.\n",
} as const satisfies Message
