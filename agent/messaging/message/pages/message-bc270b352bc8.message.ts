import type { Message } from "akasha/agent/messaging/message/message.page-type.types.ts"

export const messageBc270b352bc8 = {
  id: "01a0a306-6a33-7000-96bb-bc270b352bc8",
  type: "message",
  slug: "message-bc270b352bc8",
  to: "seat/alan",
  from: "service-watching",
  warrant: "announce",
  body: "`container-recipe-deploying` is broken. container-recipe-deploying.service failed at 2026-09-15T03:04:07.000Z, and systemd says `exit-code`. This was seen at 2026-09-15T03:05:00.915Z. What that service is and what it runs are on its page. Its log is `journalctl --user -u container-recipe-deploying.service`. This was meant for `aranya`, whom nothing could reach: no seat holds the name `aranya`, so a message written there would wait in a directory nothing drains. Refused rather than landed, because a send nobody receives must not answer as one that arrived.\n",
} as const satisfies Message
