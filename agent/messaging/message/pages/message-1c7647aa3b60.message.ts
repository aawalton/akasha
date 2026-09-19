import type { Message } from "akasha/agent/messaging/message/message.page-type.types.ts"

export const message1c7647aa3b60 = {
  id: "01a0ba6d-a1e6-7000-a565-1c7647aa3b60",
  type: "page-type/message",
  slug: "message-1c7647aa3b60",
  to: "seat/alan",
  from: "service-watching",
  warrant: "announce",
  body: "`ios-app-deploying` is broken. ios-app-deploying.service failed at 2026-09-19T16:08:31.000Z, and systemd says `exit-code`. This was seen at 2026-09-19T16:09:01.888Z. What that service is and what it runs are on its page. Its log is `journalctl --user -u ios-app-deploying.service`. This was meant for `aranya`, whom nothing could reach: no seat holds the name `aranya`, so a message written there would wait in a directory nothing drains. Refused rather than landed, because a send nobody receives must not answer as one that arrived.\n",
} as const satisfies Message
