import type { Message } from "akasha/agents/messaging/messages/message.page-type.types.ts"

export const messageC027977cb756 = {
  id: "01a096bc-aa4b-7000-8ce7-c027977cb756",
  type: "message",
  slug: "message-c027977cb756",
  to: "aranya",
  from: "service-watching",
  warrant: "announce",
  body: "`eso-addon-deploying` is broken. eso-addon-deploying.service failed, and systemd says `exit-code`. It broke just now. What that service is and what it runs are on its page. Its log is `journalctl --user -u eso-addon-deploying.service`.\n",
} as const satisfies Message
