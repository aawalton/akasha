import type { Message } from "akasha/agent/messaging/message/message.page-type.types.ts"

export const messageA7825c03ff04 = {
  id: "01a0a663-f322-7000-8b7d-a7825c03ff04",
  type: "page-type/message",
  slug: "message-a7825c03ff04",
  to: "seat/alan",
  from: "service-watching",
  warrant: "announce",
  body: "`cluster-deploying` is broken. cluster-deploying.service failed at 2026-09-15T18:45:23.000Z, and systemd says `exit-code`. This was seen at 2026-09-15T18:46:02.511Z. What that service is and what it runs are on its page. Its log is `journalctl --user -u cluster-deploying.service`. This was meant for `aranya`, whom nothing could reach: no seat holds the name `aranya`, so a message written there would wait in a directory nothing drains. Refused rather than landed, because a send nobody receives must not answer as one that arrived.\n",
} as const satisfies Message
