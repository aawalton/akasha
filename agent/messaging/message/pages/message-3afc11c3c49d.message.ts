import type { Message } from "akasha/agent/messaging/message/message.page-type.types.ts"

export const message3afc11c3c49d = {
  id: "01a0a800-d45c-7000-a497-3afc11c3c49d",
  type: "page-type/message",
  slug: "message-3afc11c3c49d",
  to: "seat/alan",
  from: "service-watching",
  warrant: "announce",
  body: "`cluster-deploying` is broken. cluster-deploying.service failed at 2026-09-16T02:16:07.000Z, and systemd says `exit-code`. This was seen at 2026-09-16T02:17:01.504Z. What that service is and what it runs are on its page. Its log is `journalctl --user -u cluster-deploying.service`. This was meant for `aranya`, whom nothing could reach: no seat holds the name `aranya`, so a message written there would wait in a directory nothing drains. Refused rather than landed, because a send nobody receives must not answer as one that arrived.\n",
} as const satisfies Message
