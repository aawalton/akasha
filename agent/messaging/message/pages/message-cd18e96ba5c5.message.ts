import type { Message } from "akasha/agent/messaging/message/message.page-type.types.ts"

export const messageCd18e96ba5c5 = {
  id: "01a0a306-b557-7000-81d4-cd18e96ba5c5",
  type: "message",
  slug: "message-cd18e96ba5c5",
  to: "seat/alan",
  from: "service-watching",
  warrant: "announce",
  body: "`ios-app-deploying` is broken. ios-app-deploying.service failed at 2026-09-15T03:04:09.000Z, and systemd says `exit-code`. This was seen at 2026-09-15T03:05:00.915Z. What that service is and what it runs are on its page. Its log is `journalctl --user -u ios-app-deploying.service`. This was meant for `aranya`, whom nothing could reach: no seat holds the name `aranya`, so a message written there would wait in a directory nothing drains. Refused rather than landed, because a send nobody receives must not answer as one that arrived.\n",
} as const satisfies Message
