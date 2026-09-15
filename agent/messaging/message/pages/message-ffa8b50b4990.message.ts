import type { Message } from "akasha/agent/messaging/message/message.page-type.types.ts"

export const messageFfa8b50b4990 = {
  id: "01a0a584-9fb2-7000-8a2e-ffa8b50b4990",
  type: "message",
  slug: "message-ffa8b50b4990",
  to: "seat/alan",
  from: "service-watching",
  warrant: "announce",
  body: "`cluster-deploying` is broken. cluster-deploying.service failed at 2026-09-15T14:41:55.000Z, and systemd says `exit-code`. This was seen at 2026-09-15T14:42:06.560Z. What that service is and what it runs are on its page. Its log is `journalctl --user -u cluster-deploying.service`. This was meant for `aranya`, whom nothing could reach: no seat holds the name `aranya`, so a message written there would wait in a directory nothing drains. Refused rather than landed, because a send nobody receives must not answer as one that arrived.\n",
} as const satisfies Message
