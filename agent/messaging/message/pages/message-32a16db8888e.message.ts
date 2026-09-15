import type { Message } from "akasha/agent/messaging/message/message.page-type.types.ts"

export const message32a16db8888e = {
  id: "01a0a2cf-a71d-7000-b142-32a16db8888e",
  type: "message",
  slug: "message-32a16db8888e",
  to: "seat/athena",
  from: "service-watching",
  warrant: "announce",
  body: "`recipient-resolver` is broken. recipient-resolver.service is `inactive` rather than running, and has been since 2026-09-15T02:02:37.000Z. This was seen at 2026-09-15T02:05:00.507Z. What that service is and what it runs are on its page. Its log is `journalctl --user -u recipient-resolver.service`.\n",
} as const satisfies Message
