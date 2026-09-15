import type { Message } from "akasha/agent/messaging/message/message.page-type.types.ts"

export const messageC715683ff908 = {
  id: "01a0a57d-3b1b-7000-9126-c715683ff908",
  type: "message",
  slug: "message-c715683ff908",
  to: "seat/alan",
  from: "service-watching",
  warrant: "announce",
  body: "`container-recipe-deploying` is broken. container-recipe-deploying.service failed at 2026-09-15T14:33:59.000Z, and systemd says `exit-code`. This was seen at 2026-09-15T14:34:02.103Z. What that service is and what it runs are on its page. Its log is `journalctl --user -u container-recipe-deploying.service`. This was meant for `aranya`, whom nothing could reach: no seat holds the name `aranya`, so a message written there would wait in a directory nothing drains. Refused rather than landed, because a send nobody receives must not answer as one that arrived.\n",
} as const satisfies Message
