import type { Message } from "akasha/agent/messaging/message/message.page-type.types.ts"

export const messageDb15ff56a16a = {
  id: "01a0b91c-ba4f-7000-9f1d-db15ff56a16a",
  type: "page-type/message",
  slug: "message-db15ff56a16a",
  to: "seat/alan",
  from: "service-watching",
  warrant: "announce",
  body: "`topic-words-service` is broken. topic-words-service.service failed at 2026-09-19T10:00:37.000Z, and systemd says `exit-code`. This was seen at 2026-09-19T10:01:02.501Z. What that service is and what it runs are on its page. Its log is `journalctl --user -u topic-words-service.service`. This was meant for `akasha`, whom nothing could reach: no seat holds the name `akasha`, so a message written there would wait in a directory nothing drains. Refused rather than landed, because a send nobody receives must not answer as one that arrived.\n",
} as const satisfies Message
