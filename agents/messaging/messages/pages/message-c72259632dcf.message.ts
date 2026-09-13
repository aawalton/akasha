import type { Message } from "akasha/agents/messaging/messages/message.page-type.types.ts"

export const messageC72259632dcf = {
  id: "01a09c59-247e-7000-b5c7-c72259632dcf",
  type: "message",
  slug: "message-c72259632dcf",
  to: "aranya",
  from: "service-watching",
  warrant: "announce",
  body: "`web-app-deploying` is broken. web-app-deploying.service failed, and systemd says `exit-code`. It broke just now. What that service is and what it runs are on its page. Its log is `journalctl --user -u web-app-deploying.service`.\n",
} as const satisfies Message
