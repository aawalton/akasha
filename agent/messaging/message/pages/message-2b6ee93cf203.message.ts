import type { Message } from "akasha/agent/messaging/message/message.page-type.types.ts"

export const message2b6ee93cf203 = {
  id: "01a0a3c4-e115-7000-977a-2b6ee93cf203",
  type: "message",
  slug: "message-2b6ee93cf203",
  to: "seat/alan",
  from: "service-watching",
  warrant: "announce",
  body: "`cluster-deploying` is broken. cluster-deploying.service failed at 2026-09-15T06:32:47.000Z, and systemd says `exit-code`. This was seen at 2026-09-15T06:33:03.251Z. What that service is and what it runs are on its page. Its log is `journalctl --user -u cluster-deploying.service`. This was meant for `aranya`, whom nothing could reach: no seat holds the name `aranya`, so a message written there would wait in a directory nothing drains. Refused rather than landed, because a send nobody receives must not answer as one that arrived.\n",
} as const satisfies Message
