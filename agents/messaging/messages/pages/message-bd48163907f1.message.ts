import type { Message } from "akasha/agents/messaging/messages/message.page-type.types.ts"

export const messageBd48163907f1 = {
  id: "01a09209-b671-7000-ab32-bd48163907f1",
  type: "message",
  slug: "message-bd48163907f1",
  to: "ember",
  from: "service-watching",
  warrant: "announce",
  body: "`temper-watcher` is broken. temper-watcher.service is `inactive` rather than running. It broke just now. What that service is and what it runs are on its page. Its log is `journalctl --user -u temper-watcher.service`.\n",
} as const satisfies Message
