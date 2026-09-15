import type { Message } from "akasha/agent/messaging/message/message.page-type.types.ts"

export const messageD4d277442f68 = {
  id: "01a0a306-fd7f-7000-a46e-d4d277442f68",
  type: "message",
  slug: "message-d4d277442f68",
  to: "seat/alan",
  from: "service-watching",
  warrant: "announce",
  body: "`royal-road-sync` is broken. royal-road-sync.service failed at 2026-09-15T03:04:09.000Z, and systemd says `exit-code`. This was seen at 2026-09-15T03:05:00.915Z. What that service is and what it runs are on its page. Its log is `journalctl --user -u royal-road-sync.service`. This was meant for `elin`, whom nothing could reach: no seat holds the name `elin`, so a message written there would wait in a directory nothing drains. Refused rather than landed, because a send nobody receives must not answer as one that arrived.\n",
} as const satisfies Message
