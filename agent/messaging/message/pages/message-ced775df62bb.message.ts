import type { Message } from "akasha/agent/messaging/message/message.page-type.types.ts"

export const messageCed775df62bb = {
  id: "01a0c9b5-6ff9-7000-8d50-ced775df62bb",
  type: "page-type/message",
  slug: "message-ced775df62bb",
  to: "seat/alan",
  from: "service-watching",
  warrant: "announce",
  body: "`container-recipe-deploying` is broken. container-recipe-deploying.service failed, and systemd had started it again by the time this read it. This was seen at 2026-09-22T15:21:45.999Z. What that service is and what it runs are on its page. Its log is `journalctl --user -u container-recipe-deploying.service`. This was meant for `aranya`, whom nothing could reach: no seat holds the name `aranya`, so a message written there would wait in a directory nothing drains. Refused rather than landed, because a send nobody receives must not answer as one that arrived.\n",
} as const satisfies Message
