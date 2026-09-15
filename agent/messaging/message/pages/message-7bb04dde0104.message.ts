import type { Message } from "akasha/agent/messaging/message/message.page-type.types.ts"

export const message7bb04dde0104 = {
  id: "01a0a578-4d30-7000-a656-7bb04dde0104",
  type: "message",
  slug: "message-7bb04dde0104",
  to: "seat/alan",
  from: "service-watching",
  warrant: "announce",
  body: "`sleep-relay-service` is broken. sleep-relay-service.service failed at 2026-09-15T14:22:15.000Z, and systemd says `exit-code`. This was seen at 2026-09-15T14:27:01.016Z. What that service is and what it runs are on its page. Its log is `journalctl --user -u sleep-relay-service.service`. This was meant for `ione`, whom nothing could reach: no seat holds the name `ione`, so a message written there would wait in a directory nothing drains. Refused rather than landed, because a send nobody receives must not answer as one that arrived.\n",
} as const satisfies Message
