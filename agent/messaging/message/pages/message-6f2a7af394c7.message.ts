import type { Message } from "akasha/agent/messaging/message/message.page-type.types.ts"

export const message6f2a7af394c7 = {
  id: "01a0b9c1-8f69-7000-8ca2-6f2a7af394c7",
  type: "page-type/message",
  slug: "message-6f2a7af394c7",
  to: "seat/alan",
  from: "service-watching",
  warrant: "announce",
  body: "`ttc-client` is broken. ttc-client.service is `inactive` rather than running, and has been since 2026-09-19T12:59:02.000Z. This was seen at 2026-09-19T13:01:04.967Z. What that service is and what it runs are on its page. Its log is `journalctl --user -u ttc-client.service`. This was meant for `ember`, whom nothing could reach: no seat holds the name `ember`, so a message written there would wait in a directory nothing drains. Refused rather than landed, because a send nobody receives must not answer as one that arrived.\n",
} as const satisfies Message
