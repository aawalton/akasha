import type { Message } from "akasha/agents/messaging/messages/message.page-type.types.ts"

export const messageC6460ba0d19d = {
  id: "01a09790-27e9-7000-b841-c6460ba0d19d",
  type: "message",
  slug: "message-c6460ba0d19d",
  to: "aranya",
  from: "service-watching",
  warrant: "announce",
  body: "`eso-addon-deploying` is broken. eso-addon-deploying.service failed, and systemd says `exit-code`. It broke just now. What that service is and what it runs are on its page. Its log is `journalctl --user -u eso-addon-deploying.service`.\n",
} as const satisfies Message
