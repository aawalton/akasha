import type { Message } from "akasha/agent/messaging/message/message.page-type.types.ts"

export const messageFf0aadd5a86a = {
  id: "01a0c958-665c-7000-a819-ff0aadd5a86a",
  type: "page-type/message",
  slug: "message-ff0aadd5a86a",
  to: "seat/alan",
  from: "service-watching",
  warrant: "announce",
  body: "`orphaned-resources-sweep` is broken. orphaned-resources-sweep.service failed at 2026-09-22T13:39:38.000Z, and systemd says `exit-code`. This was seen at 2026-09-22T13:40:05.407Z. What that service is and what it runs are on its page. Its log is `journalctl --user -u orphaned-resources-sweep.service`. This was meant for `aranya`, whom nothing could reach: no seat holds the name `aranya`, so a message written there would wait in a directory nothing drains. Refused rather than landed, because a send nobody receives must not answer as one that arrived.\n",
} as const satisfies Message
