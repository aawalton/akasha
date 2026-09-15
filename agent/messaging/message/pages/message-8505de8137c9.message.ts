import type { Message } from "akasha/agent/messaging/message/message.page-type.types.ts"

export const message8505de8137c9 = {
  id: "01a0a65a-c894-7000-999f-8505de8137c9",
  type: "page-type/message",
  slug: "message-8505de8137c9",
  to: "seat/alan",
  from: "service-watching",
  warrant: "announce",
  body: "`cluster-deploying` is broken. cluster-deploying.service failed at 2026-09-15T18:35:45.000Z, and systemd says `exit-code`. This was seen at 2026-09-15T18:36:01.815Z. What that service is and what it runs are on its page. Its log is `journalctl --user -u cluster-deploying.service`. This was meant for `aranya`, whom nothing could reach: no seat holds the name `aranya`, so a message written there would wait in a directory nothing drains. Refused rather than landed, because a send nobody receives must not answer as one that arrived.\n",
} as const satisfies Message
