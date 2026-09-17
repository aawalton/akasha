import type { Message } from "akasha/agent/messaging/message/message.page-type.types.ts"

export const messageC5681229e77b = {
  id: "01a0acbc-0e9b-7000-9c8f-c5681229e77b",
  type: "page-type/message",
  slug: "message-c5681229e77b",
  to: "seat/alan",
  from: "service-watching",
  warrant: "announce",
  body: "`monarch-poll` is broken. monarch-poll.service failed at 2026-09-17T00:19:33.000Z, and systemd says `exit-code`. This was seen at 2026-09-17T00:20:00.504Z. What that service is and what it runs are on its page. Its log is `journalctl --user -u monarch-poll.service`. This was meant for `amy`, whom nothing could reach: no seat holds the name `amy`, so a message written there would wait in a directory nothing drains. Refused rather than landed, because a send nobody receives must not answer as one that arrived.\n",
} as const satisfies Message
