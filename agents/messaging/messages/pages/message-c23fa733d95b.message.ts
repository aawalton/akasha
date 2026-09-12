import type { Message } from "akasha/agents/messaging/messages/message.page-type.types.ts"

export const messageC23fa733d95b = {
  id: "01a097ea-cbfd-7000-900c-c23fa733d95b",
  type: "message",
  slug: "message-c23fa733d95b",
  to: "aranya",
  from: "service-watching",
  warrant: "announce",
  body: "`eso-addon-deploying` is broken. eso-addon-deploying.service failed, and systemd says `exit-code`. It broke just now. What that service is and what it runs are on its page. Its log is `journalctl --user -u eso-addon-deploying.service`.\n",
} as const satisfies Message
