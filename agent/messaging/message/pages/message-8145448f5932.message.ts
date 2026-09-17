import type { Message } from "akasha/agent/messaging/message/message.page-type.types.ts"

export const message8145448f5932 = {
  id: "01a0aed0-06c3-7000-96ca-8145448f5932",
  type: "page-type/message",
  slug: "message-8145448f5932",
  to: "seat/alan",
  from: "service-watching",
  warrant: "announce",
  body: "`topic-words-service` is broken. topic-words-service.service failed at 2026-09-17T10:00:29.000Z, and systemd says `exit-code`. This was seen at 2026-09-17T10:01:03.650Z. What that service is and what it runs are on its page. Its log is `journalctl --user -u topic-words-service.service`. This was meant for `akasha`, whom nothing could reach: no seat holds the name `akasha`, so a message written there would wait in a directory nothing drains. Refused rather than landed, because a send nobody receives must not answer as one that arrived.\n",
} as const satisfies Message
