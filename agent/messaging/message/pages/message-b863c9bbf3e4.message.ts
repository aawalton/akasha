import type { Message } from "akasha/agent/messaging/message/message.page-type.types.ts"

export const messageB863c9bbf3e4 = {
  id: "01a0a989-9a38-7000-9cc7-b863c9bbf3e4",
  type: "page-type/message",
  slug: "message-b863c9bbf3e4",
  to: "seat/alan",
  from: "service-watching",
  warrant: "announce",
  body: "`ios-app-deploying` is broken. ios-app-deploying.service failed at 2026-09-16T09:25:18.000Z, and systemd says `exit-code`. This was seen at 2026-09-16T09:26:02.260Z. What that service is and what it runs are on its page. Its log is `journalctl --user -u ios-app-deploying.service`. This was meant for `aranya`, whom nothing could reach: no seat holds the name `aranya`, so a message written there would wait in a directory nothing drains. Refused rather than landed, because a send nobody receives must not answer as one that arrived.\n",
} as const satisfies Message
