import type { Message } from "akasha/agent/messaging/message/message.page-type.types.ts"

export const messageEce75c65f021 = {
  id: "01a0b722-8f6a-7000-8f1f-ece75c65f021",
  type: "page-type/message",
  slug: "message-ece75c65f021",
  to: "seat/ember",
  from: "service-watching",
  warrant: "announce",
  body: "`temper-watcher` is broken. temper-watcher.service is `inactive` rather than running, and has been since 2026-09-19T00:45:19.000Z. This was seen at 2026-09-19T00:48:10.013Z. What that service is and what it runs are on its page. Its log is `journalctl --user -u temper-watcher.service`.\n",
} as const satisfies Message
