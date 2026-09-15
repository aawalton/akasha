import type { Message } from "akasha/agent/messaging/message/message.page-type.types.ts"

export const message23bc091c93f0 = {
  id: "01a0a681-64b3-7000-90a3-23bc091c93f0",
  type: "page-type/message",
  slug: "message-23bc091c93f0",
  to: "seat/alan",
  from: "service-watching",
  warrant: "announce",
  body: "`web-app-deploying` is broken. web-app-deploying.service failed at 2026-09-15T19:17:07.000Z, and systemd says `exit-code`. This was seen at 2026-09-15T19:18:01.653Z. What that service is and what it runs are on its page. Its log is `journalctl --user -u web-app-deploying.service`. This was meant for `aranya`, whom nothing could reach: no seat holds the name `aranya`, so a message written there would wait in a directory nothing drains. Refused rather than landed, because a send nobody receives must not answer as one that arrived.\n",
} as const satisfies Message
