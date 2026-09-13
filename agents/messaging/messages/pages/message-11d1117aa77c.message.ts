import type { Message } from "akasha/agents/messaging/messages/message.page-type.types.ts"

export const message11d1117aa77c = {
  id: "01a09bff-7450-7000-9930-11d1117aa77c",
  type: "message",
  slug: "message-11d1117aa77c",
  to: "aranya",
  from: "service-watching",
  warrant: "announce",
  body: "`web-app-deploying` is broken. web-app-deploying.service failed, and systemd says `exit-code`. It broke just now. What that service is and what it runs are on its page. Its log is `journalctl --user -u web-app-deploying.service`.\n",
} as const satisfies Message
