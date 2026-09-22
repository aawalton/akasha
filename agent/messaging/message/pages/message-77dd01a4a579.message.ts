import type { Message } from "akasha/agent/messaging/message/message.page-type.types.ts"

export const message77dd01a4a579 = {
  id: "01a0c9ce-e44f-7000-8ee3-77dd01a4a579",
  type: "page-type/message",
  slug: "message-77dd01a4a579",
  to: "seat/alan",
  from: "service-watching",
  warrant: "announce",
  body: "`web-app-deploying` is broken. web-app-deploying.service failed, and systemd had started it again by the time this read it. This was seen at 2026-09-22T15:49:34.187Z. What that service is and what it runs are on its page. Its log is `journalctl --user -u web-app-deploying.service`. This was meant for `aranya`, whom nothing could reach: no seat holds the name `aranya`, so a message written there would wait in a directory nothing drains. Refused rather than landed, because a send nobody receives must not answer as one that arrived.\n",
} as const satisfies Message
