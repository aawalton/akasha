import type { Message } from "akasha/agent/messaging/message/message.page-type.types.ts"

export const message8e4d08cafcf6 = {
  id: "01a0c693-af85-7000-8e70-8e4d08cafcf6",
  type: "page-type/message",
  slug: "message-8e4d08cafcf6",
  to: "seat/alan",
  from: "service-watching",
  warrant: "announce",
  body: "`web-app-deploying` is broken. web-app-deploying.service failed at 2026-09-22T00:45:28.000Z, and systemd says `exit-code`. This was seen at 2026-09-22T00:46:02.263Z. What that service is and what it runs are on its page. Its log is `journalctl --user -u web-app-deploying.service`. This was meant for `aranya`, whom nothing could reach: no seat holds the name `aranya`, so a message written there would wait in a directory nothing drains. Refused rather than landed, because a send nobody receives must not answer as one that arrived.\n",
} as const satisfies Message
